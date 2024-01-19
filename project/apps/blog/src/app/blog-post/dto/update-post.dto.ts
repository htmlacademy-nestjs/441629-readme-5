import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

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

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];
}
