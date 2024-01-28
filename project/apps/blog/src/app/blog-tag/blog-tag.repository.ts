import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/blog/models';
import { ITag } from '@project/shared/app/types';
import { BlogTagEntity } from './blog-tag.entity';
import { ITagFilter, tagFilterToPrismaFilter } from './blog-tag.filter';
import { TAG_DEFAULT } from './blog-tag.constant';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class BlogTagRepository extends BasePostgresRepository<BlogTagEntity, ITag> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, BlogTagEntity.fromObject);
  }

  public async findById(id: string): Promise<BlogTagEntity> {
    const document = await this.client.tag.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Tag with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: ITagFilter): Promise<BlogTagEntity[]> {
    const where = filter ?? tagFilterToPrismaFilter(filter);

    const documents = await this.client.tag.findMany({
      where,
      take: TAG_DEFAULT.LIMIT,
    });

    return documents.map(document => this.createEntityFromDocument(document));
  }

  public async findMany(titles: string[]): Promise<BlogTagEntity[]> {
    const documents = await this.client.tag.findMany({
      where: {
        title: {
          in: titles,
        }
      }
    });

    return documents.map(document => this.createEntityFromDocument(document));
  }

  public async createMany(dto: CreateTagDto): Promise<BlogTagEntity[]> {
    await this.client.tag.createMany({
      data: dto.titles.map(title => ({ title })),
      skipDuplicates: true,
    });

    return await this.findMany(dto.titles);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.tag.delete({
      where: {
        id,
      },
    });
  }

  public async update(id: string, entity: BlogTagEntity): Promise<BlogTagEntity> {
    const updatedTag = await this.client.tag.update({
      where: {
        id,
      },
      data: {
        title: entity.title,
      },
    });

    return this.createEntityFromDocument(updatedTag);
  }

  public async findByIds(ids: string[]): Promise<BlogTagEntity[]> {
    const records = await this.client.tag.findMany({
      where: {
        id: {
          in: ids,
        }
      }
    });

    return records.map(record => this.createEntityFromDocument(record));
  }
}
