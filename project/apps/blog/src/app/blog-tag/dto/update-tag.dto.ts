import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  @ApiProperty({
    description: 'Tag name',
    example: 'auto'
  })
  public title: string;
}
