import { IPost } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { BlogTagEntity } from '../blog-tag/blog-tag.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogCommentEntity } from '../blog-comment/blog-comment.entity';

export class BlogPostEntity implements IPost, Entity<string, IPost> {
  public id?: string;
  public originalId?: string;
  public postType: string;
  public title?: string;
  public link?: string;
  public preview?: string;
  public text?: string;
  public author?: string;
  public photo?: string;
  public description?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public userId: string;
  public originalUserId: string;
  public isPublished?: boolean;
  public isRepost?: boolean;
  public likes: string[] = [];
  public comments: BlogCommentEntity[] = [];
  public tags: BlogTagEntity[] = [];

  static fromObject(data: IPost): BlogPostEntity {
    return new BlogPostEntity().populate(data);
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[], comments: BlogCommentEntity[]): BlogPostEntity {
    const entity = new BlogPostEntity();

    entity.tags = tags;
    entity.comments = comments;
    entity.postType = dto.postType;
    entity.title = dto.title;
    entity.link = dto.link;
    entity.preview = dto.preview;
    entity.text = dto.text;
    entity.author = dto.author;
    entity.photo = dto.photo;
    entity.description = dto.description;
    entity.userId = dto.userId;
    entity.originalUserId = dto.originalUserId;
    entity.likes = dto.likes;

    return entity;
  }

  public populate(data: IPost): BlogPostEntity {
    this.id = data.id ?? undefined;
    this.originalId = data.originalId ?? undefined;
    this.postType = data.postType;
    this.title = data.title;
    this.link = data.link;
    this.preview = data.preview;
    this.text = data.text;
    this.author = data.author;
    this.photo = data.photo;
    this.description = data.description;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.isPublished = data.isPublished ?? undefined;
    this.isRepost = data.isRepost ?? undefined;
    this.userId = data.userId;
    this.originalUserId = data.originalUserId ?? data.userId;
    this.likes = data.likes;
    this.comments = data.comments.map(comment => BlogCommentEntity.fromObject(comment));
    this.tags = data.tags.map(tag => BlogTagEntity.fromObject(tag));

    return this;
  }

  public toPOJO(): IPost {
    return {
      id: this.id,
      originalId: this.originalId,
      postType: this.postType,
      title: this.title,
      link: this.link,
      preview: this.preview,
      text: this.text,
      author: this.author,
      photo: this.photo,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isPublished: this.isPublished,
      isRepost: this.isRepost,
      userId: this.userId,
      originalUserId: this.originalUserId,
      likes: this.likes,
      comments: this.comments.map(commentEntity => commentEntity.toPOJO()),
      tags: this.tags.map(tagEntity => tagEntity.toPOJO()),
    }
  }
}
