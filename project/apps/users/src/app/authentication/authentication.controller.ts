import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/shared/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { MongoIdValidationPipe } from '@project/shared/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NotifyService } from '../notify/notify.service';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RequestWithTokenPayload } from '@project/shared/app/types';
import { ChangePasswordDto } from './dto/change-password.dto';

interface RequestWithUser {
  user?: BlogUserEntity,
}

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) { }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('register')
  public async create(
    @Body()
    dto: CreateUserDto,
  ) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;

    await this.notifyService.registerSubscriber({ email, name });

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('password')
  public async password(
    @Body()
    dto: ChangePasswordDto,
  ) {
    const user = await this.authService.changePassword(dto);
    const { email, name } = user;

    return fillDto(UserRdo, user.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been seccesfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or login is wrong.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Req()
    { user }: RequestWithUser
  ) {
    const userToken = await this.authService.createUserToken(user);

    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @HttpCode(HttpStatus.OK)
  @Get('info')
  public async info(
    @Body()
    { ids }: { ids: string[] }
  ) {
    const users = await this.authService.getManyUsers(ids);

    const result = {};
    users.forEach((item: BlogUserEntity) => {
      const user = fillDto(UserRdo, item.toPOJO());
      result[item.id] = user;
    })

    return result;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(
    @Param('id', MongoIdValidationPipe)
    id: string,
  ) {
    const existUser = await this.authService.getUser(id);

    return fillDto(UserRdo, existUser.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update an access/refresh tokens',
  })
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  public async refreshToken(
    @Req()
    { user }: RequestWithUser,
  ) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Check jwt token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(
    @Req()
    { user: payload }: RequestWithTokenPayload,
  ) {
    return payload;
  }
}
