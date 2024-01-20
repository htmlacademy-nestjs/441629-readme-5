import { IsArray, IsIn, IsMongoId, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { POST } from '../blog-post.constant';
import { SortDirectionEnum } from '@project/shared/app/types';

export class BlogPostQuery {
  @Transform(({ value }) => +value || POST.COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = POST.COUNT_LIMIT;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsMongoId()
  @IsOptional()
  public userId: string;

  @IsIn(Object.values(SortDirectionEnum))
  @IsOptional()
  public sortDirection: SortDirectionEnum = POST.SORT_DIRECTION;

  @Transform(({ value }) => +value || POST.PAGE_COUNT)
  @IsOptional()
  public page: number = POST.PAGE_COUNT;
}
