import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { API } from '../notify.constant';

export class CreateSubscriberDto {
  @ApiProperty({
    description: API.EMAIL,
    example: API.EMAIL_EXAMPLE,
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: API.NAME,
    example: API.NAME_EXAMPLE,
  })
  @IsString()
  public name: string;
}
