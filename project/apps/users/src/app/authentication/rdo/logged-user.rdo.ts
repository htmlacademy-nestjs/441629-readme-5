import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '11',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@email.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'aaa-nnn-aaa',
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
  })
  @Expose()
  public refreshToken: string;
}
