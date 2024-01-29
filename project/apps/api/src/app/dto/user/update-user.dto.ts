import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'New user name',
    example: 'Ivanov Ivan',
  })
  @IsOptional()
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'Avatar path',
    example: '/usr/local/image.png',
  })
  @IsString()
  @IsOptional()
  public avatar: string;
}
