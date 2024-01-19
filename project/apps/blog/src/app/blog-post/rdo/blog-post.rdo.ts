import { IComment, ITag } from '@project/shared/app/types';
import { Expose, Type } from 'class-transformer';
import { TagRdo } from '../../blog-tag/rdo/tag.rdo';

export class BlogPostRdo {
  @Expose()
  public id: string;

  @Expose()
  public postType: string;

  @Expose()
  title: string;

  @Expose()
  link: string;

  @Expose()
  preview: string;

  @Expose()
  text: string;

  @Expose()
  author: string;

  @Expose()
  photo: string;

  @Expose()
  description: string;

  @Expose()
  userId: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  comments: IComment[];

  @Expose()
  @Type(() => TagRdo)
  tags: TagRdo[];
}
