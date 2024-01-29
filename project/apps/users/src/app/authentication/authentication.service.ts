import * as crypto from 'node:crypto';
import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '@project/shared/app/types';
import { jwtConfig } from '@project/shared/config/users';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { AUTH } from './authentication.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { createJWTPayload } from '@project/shared/helpers';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,

    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) { }

  public async register(dto: CreateUserDto) {
    const { email, name, avatar, password } = dto;

    const blogUser = {
      email,
      name,
      avatar,
      passwordHash: '',
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH.USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password);

    return this.blogUserRepository
      .save(userEntity);
  }

  public async changePassword(dto: ChangePasswordDto) {
    const { userId, password, newPassword } = dto;

    const existUser = await this.blogUserRepository.findById(userId);

    if (!existUser) {
      throw new ConflictException(AUTH.USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH.USER_PASSWORD_WRONG);
    }

    const userEntity = await existUser
      .setPassword(newPassword);

    return this.blogUserRepository
      .update(userId, userEntity);
  }

  public async update(dto: UpdateUserDto) {
    const existUser = await this.blogUserRepository.findById(dto.userId);

    if (!existUser) {
      throw new ConflictException(AUTH.USER_NOT_FOUND);
    }

    const userEntity = new BlogUserEntity({ ...existUser.toPOJO(), ...dto });

    return this.blogUserRepository
      .update(dto.userId, userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH.USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH.USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return existUser;
  }

  public async getManyUsers(ids: string[]) {
    const existUsers = await this.blogUserRepository.findManyById(ids);

    return existUsers;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    return existUser;
  }

  public async createUserToken(user: IUser) {
    try {
      const accessTokenPayload = createJWTPayload(user);
      const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };

      await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error(`[Token generation error]: ${error.message}`);

      throw new HttpException('Error with create token.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
