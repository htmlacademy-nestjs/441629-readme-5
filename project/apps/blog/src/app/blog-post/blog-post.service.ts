import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostRepository } from './blog-post.repository';
import { BlogTagService } from '../blog-tag/blog-tag.service';
import { BlogPostQuery } from './query/blog-post.query';
import { IPagination } from '@project/shared/app/types';
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogTagService: BlogTagService,
  ) { }

  public async getAllPosts(query?: BlogPostQuery): Promise<IPagination<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const tags = await this.blogTagService.getTagsByIds(dto.tags);
    const newPost = BlogPostEntity.fromDto(dto, tags);

    console.log(newPost)

    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);

    let isSameTags = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'tags' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }

      if (key === 'tags' && value) {
        const currentTagIds = existsPost.tags.map(tag => tag.id);
        isSameTags = currentTagIds.length === value.length &&
          currentTagIds.some(tagId => value.includes(tagId));

        if (!isSameTags) {
          existsPost.tags = await this.blogTagService.getTagsByIds(dto.tags);
        }
      }
    }

    if (isSameTags && !hasChanges) {
      return existsPost;
    }

    return this.blogPostRepository.update(id, existsPost);
  }
}
