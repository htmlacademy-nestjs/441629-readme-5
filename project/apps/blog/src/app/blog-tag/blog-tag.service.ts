import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogTagRepository } from './blog-tag.repository';
import { BlogTagEntity } from './blog-tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class BlogTagService {
  constructor(
    private readonly blogTagRepository: BlogTagRepository,
  ) { }

  public async getTag(id: string): Promise<BlogTagEntity> {
    return this.blogTagRepository.findById(id);
  }

  public async getAllTags(): Promise<BlogTagEntity[]> {
    return await this.blogTagRepository.find();
  }

  public async createTags(dto: { titles: string[] }): Promise<BlogTagEntity[]> {
    const tags = await this.blogTagRepository.createMany(dto)

    return tags;
  }

  public async deleteTag(id: string): Promise<void> {
    try {
      await this.blogTagRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  public async updateTag(id: string, dto: UpdateTagDto): Promise<BlogTagEntity> {
    const blogTagEntity = new BlogTagEntity(dto);

    try {
      const updatedTag = await this.blogTagRepository.update(id, blogTagEntity);
      return updatedTag;
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  public async getTagsByIds(tagIds: string[]): Promise<BlogTagEntity[]> {
    const tags = await this.blogTagRepository.findByIds(tagIds);

    if (tags.length !== tagIds.length) {
      const foundTagIds = tags.map(tag => tag.id);
      const notFoundTagIds = tagIds.filter(tagId => !foundTagIds.includes(tagId));

      if (notFoundTagIds.length > 0) {
        throw new NotFoundException(`Tags with ids ${notFoundTagIds.join(', ')} not found.`);
      }
    }

    return tags;
  }
}
