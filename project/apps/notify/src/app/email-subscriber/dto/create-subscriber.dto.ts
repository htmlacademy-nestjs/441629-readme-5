import { IsEmail, IsNotEmpty } from 'class-validator';
import { EMAIL_SUBSCRIBER_ERROR } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_SUBSCRIBER_ERROR.EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: EMAIL_SUBSCRIBER_ERROR.NAME_IS_EMPTY })
  public name: string;
}
