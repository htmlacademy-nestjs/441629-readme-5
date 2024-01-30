import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { POST_FIELD_INFO } from '../blog-post.constant';

export class UpdatePostDto {
  @ApiProperty({
    description: POST_FIELD_INFO.TITLE_DESCRIPTION,
    example: POST_FIELD_INFO.TITLE_EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.LINK_DESCRIPTION,
    example: POST_FIELD_INFO.LINK_EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public link?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.PREVIEW_DESCRIPTION,
    example: POST_FIELD_INFO.PREVIEW_EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public preview?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.TEXT_DESCRIPTION,
    example: POST_FIELD_INFO.TEXT_EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.AUTHOR_DESCRIPTION,
    example: POST_FIELD_INFO.AUTHOR_EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public author?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.PHOTO_DESCRIPTION,
    example: POST_FIELD_INFO.PHOTO_EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public photo?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.DESCRIPTION_DESCRIPTION,
    example: POST_FIELD_INFO.DESCRIPTION_EXAMPLE,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: POST_FIELD_INFO.LIKES,
    example: POST_FIELD_INFO.LIKES_EXAMPLE,
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  public likes?: string[];

  @IsArray()
  @IsOptional()
  public comments?: string[];

  @ApiProperty({
    description: POST_FIELD_INFO.TAGS_DESCRIPTION,
    example: POST_FIELD_INFO.TAGS_EXAMPLE,
  })
  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: POST_FIELD_INFO.USER_ID,
    example: POST_FIELD_INFO.USER_ID_EXAMPLE,
  })
  @IsMongoId()
  public userId: string;
}
