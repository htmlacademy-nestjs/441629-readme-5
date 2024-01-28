import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, IsUUID, Length, max } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment for post from authorized user',
    example: 'This is cool',
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 300, {
    message: 'Comment must be string from 10 to 300 symbols'
  })
  public message: string;

  @ApiProperty({
    description: 'Mongo ID of user who create a cooment',
    example: 'aaa-aaa-aaa'
  })
  @IsString()
  @IsMongoId()
  public userId: string;
}
