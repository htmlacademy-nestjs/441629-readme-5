import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { BlogCommentEntity } from './blog-comment.entity';
import { IComment, IPagination } from '@project/shared/app/types';
import { PrismaClientService } from '@project/shared/blog/models';
import { COMMENT } from './blog-comment.constant';
import { BlogCommentQuery } from './query/blog-comment.query';

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
      }
    });

    if (!record) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record);
  }

  public async findByPostId(postId: string, query?: BlogCommentQuery): Promise<IPagination<BlogCommentEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;

    const [records, count] = await Promise.all([
      this.client.comment.findMany({
        where: {
          postId,
        },
        skip,
        take,
      }),
      this.client.comment.count({
        where: {
          postId,
        }
      }),
    ]);

    return {
      entities: records.map(record => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: Math.ceil(count / take),
      itemsPerPage: take,
      totalItems: count,
    }
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      }
    });
  }
}
