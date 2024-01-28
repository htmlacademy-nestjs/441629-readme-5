import { IsArray, IsEnum, IsMongoId, IsOptional, IsString, IsUUID } from 'class-validator';
import { PostEnum } from '@project/shared/app/types';
import { ApiProperty } from '@nestjs/swagger';
import { POST_ERROR_MESSAGES, POST_FIELD_INFO } from '../blog-post.constant';

export class CreatePostDto {
  @ApiProperty({
    description: POST_FIELD_INFO.POST_TYPE_DESCRIPTION,
    example: POST_FIELD_INFO.POST_TYPE_EXAMPLE,
  })
  @IsEnum(PostEnum)
  public postType: PostEnum;

  @ApiProperty({
    description: POST_FIELD_INFO.POST_TITLE_DESCRIPTION,
    example: POST_FIELD_INFO.POST_TITLE_EXAMPLE,
  })
  @IsString({
    message: POST_ERROR_MESSAGES.TITLE_FORMAT,
  })
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.POST_LINK_DESCRIPTION,
    example: POST_FIELD_INFO.POST_LINK_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public link?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.POST_PREVIEW_DESCRIPTION,
    example: POST_FIELD_INFO.POST_PREVIEW_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public preview?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.POST_TEXT_DESCRIPTION,
    example: POST_FIELD_INFO.POST_TEXT_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public text?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.POST_AUTHOR_DESCRIPTION,
    example: POST_FIELD_INFO.POST_AUTHOR_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public author?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.POST_PHOTO_DESCRIPTION,
    example: POST_FIELD_INFO.POST_PHOTO_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public photo?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.POST_DESCRIPTION_DESCRIPTION,
    example: POST_FIELD_INFO.POST_DESCRIPTION_EXAMPLE,
  })
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.POST_TAGS_DESCRIPTION,
    example: POST_FIELD_INFO.POST_TAGS_EXAMPLE,
  })
  @IsUUID('all', { each: true })
  @IsArray()
  public tags?: string[];

  @IsString()
  @IsMongoId()
  public userId: string;

  @IsString()
  @IsOptional()
  @IsMongoId()
  public originalUserId?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  public likes?: string[];
}
