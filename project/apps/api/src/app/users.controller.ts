import { Body, Controller, Get, HttpException, Param, Patch, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'Express';
import { LoginUserDto } from './dto/user/login-user.dto';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/user-id.interceptor';
import { CreateUserDto } from './dto/user/create-user.dto';
import { CheckNewUserGuard } from './guards/check-not-auth.guard';
import { ChangePasswordDto } from './dto/user/change-password.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { UserIdDto } from './dto/user-id.dto';

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
    try {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`, {
        headers: {
          'Authorization': request.headers['authorization'],
        }
      });

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckNewUserGuard)
  @Post('register')
  public async register(
    @Body()
    dto: CreateUserDto,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, dto);

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(FileInterceptor('file'), UserIdInterceptor)
  @Post('/avatar')
  public async avatar(
    @UploadedFile()
    file: Express.Multer.File,

    @Body()
    dto: UserIdDto,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload-info`, { ...file, buffer: file.buffer.toString('hex') });

      const addAvatarDto = {
        userId: dto.userId,
        avatar: `${data.subDirectory}/${data.hashName}`,
      };

      const res = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/update`, addAvatarDto);

      return res.data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch('update')
  public async update(
    @Body()
    dto: UpdateUserDto,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/update`, dto);

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @Post('login')
  public async login(
    @Body()
    dto: LoginUserDto,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, dto);

      return data;
    } catch (res) {
      throw new HttpException(res.response?.data?.message, res.response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('password')
  public async password(
    @Body()
    dto: ChangePasswordDto
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/password`, dto);

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @Post('refresh')
  public async refreshToken(
    @Req()
    req: Request,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
        headers: {
          'Authorization': req.headers['authorization'],
        }
      });

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }
}
