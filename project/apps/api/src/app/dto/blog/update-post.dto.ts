import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Title of publication',
    example: 'Some title for publication'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'URL for publication whitch required a link',
    example: 'http://some.url/link.html'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public link?: string;

  @ApiProperty({
    description: 'Short text about publication',
    example: 'Some short info'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public preview?: string;

  @ApiProperty({
    description: 'All text for publication',
    example: 'This text for publication'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text?: string;

  @ApiProperty({
    description: 'This field with author of quote',
    example: 'A.Pushkin'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public author?: string;

  @ApiProperty({
    description: 'Path to photo',
    example: '/usr/local/image.png'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public photo?: string;

  @ApiProperty({
    description: 'Description for publication',
    example: 'Short info about publication'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description?: string;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];
}
