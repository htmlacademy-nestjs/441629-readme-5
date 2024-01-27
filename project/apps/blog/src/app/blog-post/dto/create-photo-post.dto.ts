import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'File of a photo post',
    example: 'file.[png|jpg]',
  })
  @IsNotEmpty()
  @Matches(
    RegExp(/(.png$|.jpg$|.jpeg$)/i),
    { message: 'Photo must be a file' }
  )
  public photo: string;
}
