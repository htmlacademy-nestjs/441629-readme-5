import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { BlogPostEntity } from './blog-post.entity';
import { IPagination, IPost, SortDirectionEnum, SortEnum } from '@project/shared/app/types';
import { PrismaClientService } from '@project/shared/blog/models';
import { Prisma } from '@prisma/client';
import { BlogPostQuery } from './query/blog-post.query';
import { POST } from './blog-post.constant';

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
          connect: pojoEntity.comments.map(({ id }) => ({ id })),
        }
      }
    });

    entity.id = record.id;

    return entity;
  }

  public async repost(id: string, userId: string): Promise<BlogPostEntity> {
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

    if (await this.client.post.findFirst({
      where: {
        userId,
        originalId: document.originalId,
      }
    })) {
      throw new ConflictException(`User should only one repost of a post`);
    }

    const record = await this.client.post.create({
      data: {
        ...document,
        originalId: document.originalId ?? document.id,
        originalUserId: document.userId,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        userId,
        likes: [],
        isRepost: true,
        tags: {
          connect: document.tags.map(({ id }) => ({ id })),
        },
        comments: {
          connect: [],
        }
      },
      include: {
        tags: true,
        comments: true,
      }
    });

    const entity = this.createEntityFromDocument(record);

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
        likes: pojoEntity.likes,
        isPublished: pojoEntity.isPublished,
        comments: {
          set: pojoEntity.comments.map(comment => ({ id: comment.id })),
        },
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

  public async search(str: string): Promise<BlogPostEntity[]> {
    const records = await this.client.post.findMany({
      where: {
        title: {
          contains: str,
          mode: 'insensitive',
        },
      },
      take: POST.SEARCH_LIMIT,
      include: {
        tags: true,
        comments: true,
      }
    });

    return records.map(record => this.createEntityFromDocument(record))
  }

  public async find(query?: BlogPostQuery): Promise<IPagination<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    where.isPublished = true;

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

    const sortDirection = query?.sortDirection ?? SortDirectionEnum.Desc;

    if (query?.sortType) {
      if (query.sortType === SortEnum.likes) {
        orderBy.likes = sortDirection;
      } else if (query.sortType === SortEnum.comments) {
        orderBy.comments = {
          _count: sortDirection,
        }
      } else {
        orderBy.createdAt = sortDirection;
      }
    } else {
      orderBy.createdAt = sortDirection
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
