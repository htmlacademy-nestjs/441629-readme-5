import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { API } from '../authentication.constant';

export class ChangePasswordDto {
  @ApiProperty({
    description: API.USER_ID,
    example: API.USER_ID_EXAMPLE,
  })
  @IsString()
  public userId: string;

  @ApiProperty({
    description: API.PASSWORD,
    example: API.PASSWORD_EXAMPLE,
  })
  @IsString()
  public password: string;

  @ApiProperty({
    description: API.PASSWORD,
    example: API.PASSWORD_EXAMPLE,
  })
  @IsString()
  public newPassword: string;
}
