import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { API, EMAIL_SUBSCRIBER_ERROR } from '../email-subscriber.constant';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriberDto {
  @ApiProperty({
    description: API.EMAIL,
    example: API.EMAIL_EXAMPLE,
  })
  @IsEmail({}, {
    message: EMAIL_SUBSCRIBER_ERROR.EMAIL_NOT_VALID,
  })
  public email: string;

  @ApiProperty({
    description: API.NAME,
    example: API.NAME_EXAMPLE,
  })
  @IsString()
  @IsNotEmpty({
    message: EMAIL_SUBSCRIBER_ERROR.NAME_IS_EMPTY
  })
  public name: string;
}
