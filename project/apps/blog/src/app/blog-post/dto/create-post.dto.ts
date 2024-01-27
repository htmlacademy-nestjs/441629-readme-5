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

  @IsString()
  @IsOptional()
  public link?: string;

  @IsString()
  @IsOptional()
  public preview?: string;

  @IsString()
  @IsOptional()
  public text?: string;

  @IsString()
  @IsOptional()
  public author?: string;

  @IsString()
  @IsOptional()
  public photo?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsUUID('all', { each: true })
  @IsArray()
  public tags?: string[];

  @IsOptional()
  @IsArray()
  public comments?: string[];

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
