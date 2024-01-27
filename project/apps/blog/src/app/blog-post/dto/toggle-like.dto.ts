import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class ToggleLikeDto {
  @IsNotEmpty()
  @IsMongoId()
  public likeId: string;
}
