import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Firstname Lastname',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Avatar path',
    example: '/file/image.jpg',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @Expose()
  public avatar: string;

  @Expose()
  public updatedAt: string;

  @Expose()
  public createdAt: string;
}
