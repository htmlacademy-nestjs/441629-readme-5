import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Some text as comment for publication',
    example: 'This is cool story',
  })
  @IsString()
  @IsNotEmpty()
  public message: string;
}
