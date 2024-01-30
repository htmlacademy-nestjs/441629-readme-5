import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { UpdateUserDto } from './dto/update-user.dto';
import { AUTH } from './authentication.constant';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersInfoDto } from './dto/users-info.dto';

interface RequestWithUser {
  user?: BlogUserEntity,
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService,
  ) { }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AUTH.LOGGED,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AUTH.USER_PASSWORD_OR_EMAIL_WRONG,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body()
    body: LoginUserDto,

    @Req()
    { user }: RequestWithUser
  ) {
    const userToken = await this.authService.createUserToken(user);

    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AUTH.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AUTH.USER_EXISTS,
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user info.',
  })
  @Patch('update')
  public async update(
    @Body()
    dto: UpdateUserDto,
  ) {
    const updatedUser = await this.authService.update(dto);

    return fillDto(UserRdo, updatedUser.toPOJO());
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
    type: UserRdo,
    status: HttpStatus.OK,
    description: AUTH.GET,
  })
  @HttpCode(HttpStatus.OK)
  @Post('info')
  public async info(
    @Body()
    dto: UsersInfoDto,
  ) {
    const users = await this.authService.getManyUsers(dto.ids);

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
    description: AUTH.GET,
  })
  @ApiBearerAuth('JWT-auth')
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
    description: AUTH.TOKEN,
  })
  @ApiBearerAuth('JWT-auth')
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
    status: HttpStatus.CREATED,
    description: AUTH.CHECK_TOKEN,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AUTH.UNAUTHORIZED,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(
    @Req()
    { user: payload }: RequestWithTokenPayload,
  ) {
    return payload;
  }
}
