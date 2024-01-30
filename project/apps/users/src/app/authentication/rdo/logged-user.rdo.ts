import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { API } from '../authentication.constant';

export class LoggedUserRdo {
  @ApiProperty({
    description: API.USER_ID,
    example: API.USER_ID_EXAMPLE,
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: API.EMAIL,
    example: API.EMAIL_EXAMPLE,
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: API.TOKEN,
    example: API.TOKEN_EXAMPLE,
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: API.TOKEN,
    example: API.TOKEN_EXAMPLE
  })
  @Expose()
  public refreshToken: string;
}
