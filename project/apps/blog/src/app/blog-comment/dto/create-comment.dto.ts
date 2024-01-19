import { IsMongoId, IsNotEmpty, IsString, IsUUID, Length, max } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 300, {
    message: 'Comment must be string from 10 to 300 symbols'
  })
  public message: string;

  @IsString()
  @IsMongoId()
  public userId: string;

  // @IsString()
  // @IsUUID('all')
  // public postId: string;
}
