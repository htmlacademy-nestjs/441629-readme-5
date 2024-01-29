import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User id',
    example: '11122333aa',
  })
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: 'User name',
    example: 'Firstname Lastname',
  })
  @IsOptional()
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'Avatar path',
    example: '/file/image.jpg',
  })
  @IsString()
  @IsOptional()
  public avatar: string;
}
