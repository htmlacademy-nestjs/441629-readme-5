import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'New user email',
    example: 'test@email.local',
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'New user name',
    example: 'Ivanov Ivan',
  })
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'Avatar path',
    example: '/usr/local/image.png',
  })
  @IsString()
  @IsOptional()
  public avatar: string;

  @ApiProperty({
    description: 'Password',
    example: 'qwerty',
  })
  @IsString()
  public password: string;
}
