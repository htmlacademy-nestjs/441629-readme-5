import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { AUTH } from '../authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsEmail({}, {
    message: AUTH.USER_EMAIL_NOT_VALID,
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Firstname Lastname',
  })
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'Avatar path',
    example: '/file/image.jpg',
  })
  @IsString()
  @IsOptional()
  public avatar: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password: string;
}
