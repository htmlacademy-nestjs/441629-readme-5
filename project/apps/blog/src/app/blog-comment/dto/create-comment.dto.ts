import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, IsUUID, Length, max } from 'class-validator';
import { COMMENT_VALIDATE } from '../blog-comment.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: COMMENT_VALIDATE.MESSAGE,
    example: COMMENT_VALIDATE.MESSAGE_EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 300, {
    message: COMMENT_VALIDATE.MESSAGE_LENGTH
  })
  public message: string;

  @ApiProperty({
    description: COMMENT_VALIDATE.USER_ID,
    example: COMMENT_VALIDATE.USER_ID_EXAMPLE,
  })
  @IsString()
  @IsMongoId()
  public userId: string;
}
