import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'newyear'
  })
  @IsString()
  @Length(3, 10, {
    message: 'Lenght of tag must be from 3 to 10 symbols',
  })
  public title: string;
}
