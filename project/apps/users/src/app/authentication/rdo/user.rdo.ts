import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { API } from '../authentication.constant';

export class UserRdo {
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
    description: API.NAME,
    example: API.NAME_EXAMPLE,
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: API.AVATAR,
    example: API.AVATAR_EXAMPLE,
  })
  @Expose()
  public avatar: string;

  @Expose()
  public updatedAt: string;

  @Expose()
  public createdAt: string;
}
