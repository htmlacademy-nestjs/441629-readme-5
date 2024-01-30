import { IsString, Length } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { POST_ERROR_MESSAGES, POST_FIELD_INFO, POST_LENGTH_VALUES } from '../blog-post.constant';

export class CreateTextPostDto extends CreatePostDto {
  @ApiProperty({
    description: POST_FIELD_INFO.TITLE_DESCRIPTION,
    example: POST_FIELD_INFO.TITLE_EXAMPLE,
  })
  @IsString({ message: POST_ERROR_MESSAGES.TITLE_FORMAT })
  @Length(
    POST_LENGTH_VALUES.TITLE_LENGTH_MIN,
    POST_LENGTH_VALUES.TITLE_LENGTH_MAX,
    { message: POST_ERROR_MESSAGES.TITLE_LENGTH, }
  )
  public title: string;

  @ApiProperty({
    description: POST_FIELD_INFO.PREVIEW_DESCRIPTION,
    example: POST_FIELD_INFO.PREVIEW_EXAMPLE,
  })
  @IsString({ message: POST_ERROR_MESSAGES.PREVIEW_FORMAT })
  @Length(
    POST_LENGTH_VALUES.PREVIEW_LENGTH_MIN,
    POST_LENGTH_VALUES.PREVIEW_LENGTH_MAX,
    { message: POST_ERROR_MESSAGES.PREVIEW_LENGTH, }
  )
  public preview: string;

  @ApiProperty({
    description: POST_FIELD_INFO.TEXT_DESCRIPTION,
    example: POST_FIELD_INFO.TEXT_EXAMPLE,
  })
  @IsString({ message: POST_ERROR_MESSAGES.TEXT_FORMAT })
  @Length(
    POST_LENGTH_VALUES.TEXT_LENGTH_MIN,
    POST_LENGTH_VALUES.TEXT_LENGTH_MAX,
    { message: POST_ERROR_MESSAGES.TEXT_LENGTH_TEXT, }
  )
  public text: string;
}
