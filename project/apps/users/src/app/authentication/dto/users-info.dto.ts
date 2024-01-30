import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { API } from '../authentication.constant';

export class UsersInfoDto {
  @ApiProperty({
    description: API.USER_ID,
    example: [ API.USER_ID_EXAMPLE, API.USER_ID_EXAMPLE ],
  })
  @IsArray()
  @IsMongoId({ each: true, })
  public ids: string[];
}
