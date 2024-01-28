import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SeachPostsDto {
  @ApiProperty({
    description: 'Search posts by substring in title',
    example: 'Post name',
  })
  @IsString()
  @IsNotEmpty()
  public substring: string;
}
