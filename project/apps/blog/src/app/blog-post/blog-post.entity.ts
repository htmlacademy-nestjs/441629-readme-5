import { IPost } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { BlogTagEntity } from '../blog-tag/blog-tag.entity';
import { CreatePostDto } from './dto/create-post.dto';

export class BlogPostEntity implements IPost, Entity<string, IPost> {
  public id?: string;
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
  public comments: [];
  public tags: BlogTagEntity[];

  static fromObject(data: IPost): BlogPostEntity {
    return new BlogPostEntity().populate(data);
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[]): BlogPostEntity {
    const entity = new BlogPostEntity();

    entity.tags = tags;
    entity.postType = dto.postType;
    entity.title = dto.title;
    entity.link = dto.link;
    entity.preview = dto.preview;
    entity.text = dto.text;
    entity.author = dto.author;
    entity.photo = dto.photo;
    entity.description = dto.description;
    entity.userId = dto.userId;
    entity.comments = [];

    return entity;
  }

  public populate(data: IPost): BlogPostEntity {
    this.id = data.id ?? undefined;
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
    this.userId = data.userId;
    // this.comments = data.comments.map(comment => comment)
    this.tags = data.tags.map(tag => BlogTagEntity.fromObject(tag));

    return this;
  }

  public toPOJO(): IPost {
    return {
      id: this.id,
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
      userId: this.userId,
      comments: [],
      tags: this.tags.map(tagEntity => tagEntity.toPOJO()),
    }
  }
}
