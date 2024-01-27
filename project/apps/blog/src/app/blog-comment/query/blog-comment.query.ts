import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { COMMENT } from '../blog-comment.constant';

export class BlogCommentQuery {
  @Transform(({ value }) => +value || COMMENT.COUNT_PER_PAGE)
  @IsNumber()
  @IsOptional()
  public limit = COMMENT.COUNT_PER_PAGE;

  @Transform(({ value }) => +value || COMMENT.PAGE_NUMBER)
  @IsOptional()
  public page: number = COMMENT.PAGE_NUMBER;
}
