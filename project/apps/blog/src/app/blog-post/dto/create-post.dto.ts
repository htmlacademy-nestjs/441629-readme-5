import { IsArray, IsEnum, IsMongoId, IsOptional, IsString, IsUUID } from 'class-validator';
import { PostEnum } from '@project/shared/app/types';
import { ApiProperty } from '@nestjs/swagger';
import { POST_ERROR_MESSAGES, POST_FIELD_INFO } from '../blog-post.constant';

export class CreatePostDto {
  @ApiProperty({
    description: POST_FIELD_INFO.TYPE_DESCRIPTION,
    example: POST_FIELD_INFO.TYPE_EXAMPLE,
  })
  @IsEnum(PostEnum)
  public postType: PostEnum;

  @ApiProperty({
    description: POST_FIELD_INFO.TITLE_DESCRIPTION,
    example: POST_FIELD_INFO.TITLE_EXAMPLE,
  })
  @IsString({
    message: POST_ERROR_MESSAGES.TITLE_FORMAT,
  })
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.LINK_DESCRIPTION,
    example: POST_FIELD_INFO.LINK_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public link?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.PREVIEW_DESCRIPTION,
    example: POST_FIELD_INFO.PREVIEW_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public preview?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.TEXT_DESCRIPTION,
    example: POST_FIELD_INFO.TEXT_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public text?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.AUTHOR_DESCRIPTION,
    example: POST_FIELD_INFO.AUTHOR_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public author?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.PHOTO_DESCRIPTION,
    example: POST_FIELD_INFO.PHOTO_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public photo?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.DESCRIPTION_DESCRIPTION,
    example: POST_FIELD_INFO.DESCRIPTION_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.TAGS_DESCRIPTION,
    example: POST_FIELD_INFO.TAGS_EXAMPLE,
  })
  @IsUUID('all', { each: true })
  @IsArray()
  public tags?: string[];

  @ApiProperty({
    description: POST_FIELD_INFO.USER_ID,
    example: POST_FIELD_INFO.USER_ID_EXAMPLE,
  })
  @IsString()
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    description: POST_FIELD_INFO.USER_ID,
    example: POST_FIELD_INFO.USER_ID_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  @IsMongoId()
  public originalUserId?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.LIKES,
    example: POST_FIELD_INFO.LIKES_EXAMPLE,
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  public likes?: string[];
}
