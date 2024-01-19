import { IComment } from './comment.interface';
import { ITag } from './tag.interface';

export interface IPost {
  id?: string;
  postType: string;
  title?: string;
  link?: string;
  preview?: string;
  text?: string;
  author?: string;
  photo?: string;
  description?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments: IComment[];
  tags: ITag[];
}
