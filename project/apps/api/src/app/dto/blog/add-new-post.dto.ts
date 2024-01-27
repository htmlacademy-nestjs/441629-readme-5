import { IsArray, IsEnum, IsMongoId, IsOptional, IsString, IsUUID } from 'class-validator';
import { PostEnum } from '@project/shared/app/types';
import { ApiProperty } from '@nestjs/swagger';

export class AddNewPostDto {
  @ApiProperty({
    description: 'One of quote, video, text, photo, link',
    example: 'quote'
  })
  @IsEnum(PostEnum)
  public postType: PostEnum;

  @ApiProperty({
    description: 'Title of publication',
    example: 'Some title for publication'
  })
  @IsString()
  @IsOptional()
  public title?: string;


  @ApiProperty({
    description: 'URL for publication whitch required a link',
    example: 'http://some.url/link.html'
  })
  @IsString()
  @IsOptional()
  public link?: string;

  @ApiProperty({
    description: 'Short text about publication',
    example: 'Some short info'
  })
  @IsString()
  @IsOptional()
  public preview?: string;

  @ApiProperty({
    description: 'All text for publication',
    example: 'This text for publication'
  })
  @IsString()
  @IsOptional()
  public text?: string;

  @ApiProperty({
    description: 'This field with author of quote',
    example: 'A.Pushkin'
  })
  @IsString()
  @IsOptional()
  public author?: string;

  @ApiProperty({
    description: 'Path to photo',
    example: '/usr/local/image.png'
  })
  @IsString()
  @IsOptional()
  public photo?: string;

  @ApiProperty({
    description: 'Description for publication',
    example: 'Short info about publication'
  })
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Array of tags',
    example: '[ ad48ef46-6ea6-41c4-a19f-e66b82bdf855 ]'
  })
  @IsUUID('all', { each: true })
  @IsArray()
  public tags?: string[];

  @ApiProperty({
    description: 'Mongo id as user id',
    example: '6580462f5e238357ab17003a'
  })
  @IsString()
  @IsMongoId()
  public userId: string;
}
