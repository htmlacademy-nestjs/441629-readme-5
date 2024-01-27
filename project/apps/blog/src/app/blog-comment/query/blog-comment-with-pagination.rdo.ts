import { Expose } from 'class-transformer';
import { BlogCommentRdo } from '../rdo/blog-comment.rdo';

export class BlogCommentWithPaginationRdo {
  @Expose()
  public entities: BlogCommentRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
