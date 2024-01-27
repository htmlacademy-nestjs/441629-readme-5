import { IsString, Length } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class CreateQuotePostDto extends CreatePostDto {
  @IsString()
  @Length(20, 300, {
    message: 'Quote lenght must be from 20 to 300 symbols',
  })
  public text: string;

  @IsString()
  @Length(3, 50, {
    message: 'Quote author lenght must be from 3 to 50 symbols',
  })
  public author: string;
}
