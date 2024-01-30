import { IsString, Length } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { POST_ERROR_MESSAGES, POST_FIELD_INFO, POST_LENGTH_VALUES } from '../blog-post.constant';

export class CreateQuotePostDto extends CreatePostDto {
  @ApiProperty({
    description: POST_FIELD_INFO.TEXT_DESCRIPTION,
    example: POST_FIELD_INFO.TEXT_EXAMPLE,
  })
  @IsString()
  @Length(
    POST_LENGTH_VALUES.QUOTE_LENGTH_MIN,
    POST_LENGTH_VALUES.QUOTE_LENGTH_MAX,
    { message: POST_ERROR_MESSAGES.QUOTE_LENGTH, }
  )
  public text: string;

  @IsString()
  @Length(
    POST_LENGTH_VALUES.AUTHOR_LENGTH_MIN,
    POST_LENGTH_VALUES.AUTHOR_LENGTH_MAX,
    { message: POST_ERROR_MESSAGES.AUTHOR_LENGTH, }
  )
  public author: string;
}
