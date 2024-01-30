import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { POST_ERROR_MESSAGES, POST_FIELD_INFO, POST_LENGTH_VALUES } from '../blog-post.constant';

export class CreateLinkPostDto extends CreatePostDto {
  @ApiProperty({
    description: POST_FIELD_INFO.LINK_DESCRIPTION,
    example: POST_FIELD_INFO.LINK_EXAMPLE,
  })
  @IsNotEmpty()
  @IsUrl({}, {
    message: POST_ERROR_MESSAGES.LINK_FORMAT,
  })
  public link: string;

  @ApiProperty({
    description: POST_FIELD_INFO.DESCRIPTION_DESCRIPTION,
    example: POST_FIELD_INFO.DESCRIPTION_EXAMPLE,
  })
  @IsNotEmpty()
  @IsString({
    message: POST_ERROR_MESSAGES.DESCRIPTION_FORMAT,
  })
  @MaxLength(
    POST_LENGTH_VALUES.DESCRIPTION_LINK_MAX,
    { message: POST_ERROR_MESSAGES.DESCRIPTION_LENGTH })
  public description: string;
}
