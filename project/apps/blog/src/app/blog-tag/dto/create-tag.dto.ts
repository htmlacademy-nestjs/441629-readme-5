import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsString, Length } from 'class-validator';
import { TAG_DEFAULT } from '../blog-tag.constant';

export class CreateTagDto {
  @ApiProperty({
    description: 'Tags list',
    example: '[auto, moto]'
  })
  @IsArray()
  @ArrayMaxSize(TAG_DEFAULT.LIMIT, {
    message: `Max tags count must be ${TAG_DEFAULT.LIMIT}`,
  })
  @Length(
    TAG_DEFAULT.MIN_TAG_LENGTH,
    TAG_DEFAULT.MAX_TAG_LENGTH,
    {
      each: true,
      message: `Lenght of tag must be from ${TAG_DEFAULT.MIN_TAG_LENGTH} to ${TAG_DEFAULT.MAX_TAG_LENGTH} symbols`,
    }
  )
  @IsString({
    each: true,
  })
  @Transform(({ value }) => value.map(item => item.replace(/\ /g, '_').toLowerCase()))
  public titles: string[];
}
