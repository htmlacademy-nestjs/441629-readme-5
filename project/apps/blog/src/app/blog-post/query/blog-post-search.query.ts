import { IsOptional, IsString } from 'class-validator';

export class BlogPostSeachQuery {
  @IsString()
  @IsOptional()
  public substring = '';
}
