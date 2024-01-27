import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { POST_ERROR_MESSAGES, POST_LENGTH_VALUES } from '../blog-post.constant';

export class CreateLinkPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'URL of a link post',
    example: '/partofurl/name.html',
  })
  @IsNotEmpty()
  @IsUrl({}, {
    message: POST_ERROR_MESSAGES.LINK_FORMAT,
  })
  public link: string;

  @ApiProperty({
    description: 'Description of a link post'
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
