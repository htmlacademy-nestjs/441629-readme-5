import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { POST_FIELD_INFO } from '../blog-post.constant';

export class ToggleLikeDto {
  @ApiProperty({
    description: POST_FIELD_INFO.LIKES,
    example: POST_FIELD_INFO.LIKES_EXAMPLE,
  })
  @IsNotEmpty()
  @IsMongoId()
  public likeId: string;
}
