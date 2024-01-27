import { IsString, IsUrl, Length } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class CreateVideoPostDto extends CreatePostDto {
  @IsString()
  @Length(20, 50, {
    message: 'Title lenght must be from 20 to 50 symbols',
  })
  public title: string;

  @IsUrl({})
  public link: string;
}
