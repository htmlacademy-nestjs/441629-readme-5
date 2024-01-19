import { IsArray, IsEnum, IsMongoId, IsOptional, IsString, IsUUID } from 'class-validator';
import { PostEnum } from '@project/shared/app/types';

export class CreatePostDto {
  @IsEnum(PostEnum)
  public postType: PostEnum;

  @IsString()
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

  @IsString()
  @IsMongoId()
  public userId: string;
}
