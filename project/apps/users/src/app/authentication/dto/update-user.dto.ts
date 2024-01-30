import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { API } from '../authentication.constant';

export class UpdateUserDto {
  @ApiProperty({
    description: API.USER_ID,
    example: API.USER_ID_EXAMPLE,
  })
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: API.NAME,
    example: API.NAME_EXAMPLE,
  })
  @IsOptional()
  @IsString()
  public name: string;

  @ApiProperty({
    description: API.AVATAR,
    example: API.AVATAR_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public avatar: string;
}
