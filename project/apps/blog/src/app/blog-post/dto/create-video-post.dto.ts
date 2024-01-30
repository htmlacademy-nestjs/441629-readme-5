import { IsString, IsUrl, Length } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { POST_ERROR_MESSAGES, POST_FIELD_INFO, POST_LENGTH_VALUES } from '../blog-post.constant';

export class CreateVideoPostDto extends CreatePostDto {
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
    description: POST_FIELD_INFO.LINK_DESCRIPTION,
    example: POST_FIELD_INFO.LIKES_EXAMPLE,
  })
  @IsUrl({}, {
    message: POST_ERROR_MESSAGES.LINK_FORMAT,
  })
  public link: string;
}
