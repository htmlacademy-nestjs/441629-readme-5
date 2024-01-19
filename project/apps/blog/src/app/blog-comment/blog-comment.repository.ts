import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { BlogCommentEntity } from './blog-comment.entity';
import { IComment } from '@project/shared/app/types';
import { PrismaClientService } from '@project/shared/blog/models';
import { COMMENTS_PER_PAGE } from './blog-comment.constant';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, IComment> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, BlogCommentEntity.fromObject);
  }

  public async save(entity: BlogCommentEntity): Promise<BlogCommentEntity> {
    const record = await this.client.comment.create({
      data: {
        message: entity.message,
        userId: entity.userId,
        postId: entity.postId,
      },
    });

    entity.id = record.id;

    return entity;
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const record = await this.client.comment.findFirst({
      where: {
        id,
      },
      take: COMMENTS_PER_PAGE,
    });

    if (!record) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record);
  }

  public async findByPostId(postId: string): Promise<BlogCommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        postId,
      }
    });

    return records.map(record => this.createEntityFromDocument(record));
  }
}
