import { IComment, ITag } from '@project/shared/app/types';
import { Exclude, Expose, Type } from 'class-transformer';
import { TagRdo } from '../../blog-tag/rdo/tag.rdo';
import { BlogCommentRdo } from '../../blog-comment/rdo/blog-comment.rdo';

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

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;

  @Expose()
  likes: string[];

  @Exclude()
  isPublished: boolean;

  @Expose()
  isRepost: boolean;

  @Expose()
  @Type(() => BlogCommentRdo)
  comments: IComment[];

  @Expose()
  @Type(() => TagRdo)
  tags: ITag[];
}
