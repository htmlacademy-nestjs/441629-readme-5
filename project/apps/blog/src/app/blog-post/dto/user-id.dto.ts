import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { POST_FIELD_INFO } from '../blog-post.constant';

export class UserIdDto {
  @ApiProperty({
    description: POST_FIELD_INFO.USER_ID,
    example: POST_FIELD_INFO.USER_ID_EXAMPLE,
  })
  @IsNotEmpty()
  @IsMongoId()
  public userId: string;
}
