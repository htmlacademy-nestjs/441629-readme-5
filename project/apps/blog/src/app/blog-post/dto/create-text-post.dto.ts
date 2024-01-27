import { IsString, Length } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class CreateTextPostDto extends CreatePostDto {
  @IsString()
  @Length(20, 50, {
    message: 'Title lenght must be from 20 to 50 symbols',
  })
  public title: string;

  @IsString()
  @Length(50, 255, {
    message: 'Preview lenght must be from 50 to 255 symbols',
  })
  public preview: string;

  @IsString()
  @Length(100, 1024, {
    message: 'Text lenght must be from 100 to 1024 symbols',
  })
  public text: string;
}
