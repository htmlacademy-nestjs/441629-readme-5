import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { COMMENT_VALIDATE } from '../blog-comment.constant';

export class DeleteCommentDto {
  @ApiProperty({
    description: COMMENT_VALIDATE.USER_ID,
    example: COMMENT_VALIDATE.USER_ID_EXAMPLE,
  })
  @IsNotEmpty()
  @IsString()
  public userId: string;
}
