import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { BlogPostEntity } from './blog-post.entity';
import { IPagination, IPost } from '@project/shared/app/types';
import { PrismaClientService } from '@project/shared/blog/models';
import { Prisma } from '@prisma/client';
import { BlogPostQuery } from './query/blog-post.query';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, IPost> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, BlogPostEntity.fromObject);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        tags: {
          connect: pojoEntity.tags.map(({ id }) => ({ id })),
        },
        comments: {
          connect: [],
        }
      }
    });

    entity.id = record.id;

    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        comments: true,
      }
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async update(id: string, entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();
    const updatedPost = await this.client.post.update({
      where: {
        id,
      },
      data: {
        title: pojoEntity.title,
        link: pojoEntity.link,
        preview: pojoEntity.preview,
        text: pojoEntity.text,
        author: pojoEntity.author,
        photo: pojoEntity.photo,
        description: pojoEntity.description,
        tags: {
          set: pojoEntity.tags.map(tag => ({ id: tag.id })),
        },
      },
      include: {
        tags: true,
        comments: true,
      }
    });

    return this.createEntityFromDocument(updatedPost);
  }

  public async find(query?: BlogPostQuery): Promise<IPagination<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.tags) {
      where.tags = {
        some: {
          id: {
            in: query.tags,
          }
        }
      }
    }

    if (query?.userId) {
      where.userId = query.userId;
    }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          tags: true,
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map(record => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }
}
