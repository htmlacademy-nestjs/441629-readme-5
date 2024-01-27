import { Body, Controller, Get, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'Express';
import { LoginUserDto } from './dto/user/login-user.dto';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/user-id.interceptor';
import { CreateUserDto } from './dto/user/create-user.dto';
import { CheckNewUserGuard } from './guards/check-not-auth.guard';
import { ChangePasswordDto } from './dto/user/change-password.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users routes')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @Get('/:id')
  public async show(
    @Param('id')
    id: string,

    @Req()
    request: Request,
  ) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`, {
      headers: {
        'Authorization': request.headers['authorization'],
      }
    });

    return data;
  }

  @UseGuards(CheckNewUserGuard)
  @Post('register')
  public async register(
    @Body()
    dto: CreateUserDto,
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, dto);

    return data;
  }

  @Post('login')
  public async login(
    @Body()
    dto: LoginUserDto,
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, dto);

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('password')
  public async password(
    @Body()
    dto: ChangePasswordDto
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/password`, dto);

    return data;
  }

  @Post('refresh')
  public async refreshToken(
    @Req()
    req: Request,
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization'],
      }
    });

    return data
  }
}
