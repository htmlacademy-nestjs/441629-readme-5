import { IComment } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { CreateCommentDto } from './dto/create-comment.dto';

export class BlogCommentEntity implements IComment, Entity<string, IComment> {
  public id?: string;
  public createdAt: Date;
  public updatedAt: Date;
  public postId: string;
  public message: string;
  public userId: string;

  static fromObject(data: IComment): BlogCommentEntity {
    return new BlogCommentEntity().populate(data);
  }

  static fromDto(dto: CreateCommentDto, postId: string): BlogCommentEntity {
    return new BlogCommentEntity()
      .populate({
        ...dto,
        postId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
  }

  public populate(data: IComment): BlogCommentEntity {
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.postId = data.postId;
    this.message = data.message;
    this.userId = data.userId;

    return this;
  }

  public toPOJO(): IComment {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      message: this.message,
      userId: this.userId,
    }
  }
}
