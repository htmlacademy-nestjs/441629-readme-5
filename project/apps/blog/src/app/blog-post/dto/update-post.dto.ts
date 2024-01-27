import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public link?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public preview?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public author?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public photo?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description?: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  public likes?: string[];

  @IsArray()
  @IsOptional()
  public comments?: string[];

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsMongoId()
  public userId: string;
}
