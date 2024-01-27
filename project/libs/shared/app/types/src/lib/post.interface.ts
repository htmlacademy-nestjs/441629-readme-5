import { IComment } from './comment.interface';
import { ITag } from './tag.interface';

export interface IPost {
  id?: string;
  originalId?: string;
  postType: string;
  title?: string;
  link?: string;
  preview?: string;
  text?: string;
  author?: string;
  photo?: string;
  description?: string;
  userId: string;
  originalUserId: string;
  createdAt?: Date;
  updatedAt?: Date;
  isPublished?: boolean;
  isRepost?: boolean;
  likes?: string[];
  comments?: IComment[];
  tags: ITag[];
}
