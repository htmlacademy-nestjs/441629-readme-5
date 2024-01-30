import { IsNotEmpty, Matches } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { POST_ERROR_MESSAGES, POST_FIELD_INFO } from '../blog-post.constant';

export class CreatePhotoPostDto extends CreatePostDto {
  @ApiProperty({
    description: POST_FIELD_INFO.PHOTO_DESCRIPTION,
    example: POST_FIELD_INFO.PHOTO_EXAMPLE,
  })
  @IsNotEmpty()
  @Matches(
    RegExp(/(.png$|.jpg$|.jpeg$)/i),
    { message: POST_ERROR_MESSAGES.PHOTO_FORMAT }
  )
  public photo: string;
}
