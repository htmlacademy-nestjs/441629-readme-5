import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogPostRepository } from './blog-post.repository';
import { BlogTagService } from '../blog-tag/blog-tag.service';
import { BlogPostQuery } from './query/blog-post.query';
import { IPagination } from '@project/shared/app/types';
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogCommentService } from '../blog-comment/blog-comment.service';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogTagService: BlogTagService,
    private readonly blogCommentService: BlogCommentService,
  ) { }

  public async getAllPosts(query?: BlogPostQuery): Promise<IPagination<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const tags = await this.blogTagService.getTagsByIds(dto.tags);
    const newPost = BlogPostEntity.fromDto(dto, tags, []);

    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async repostPost(id: string, userId: string): Promise<BlogPostEntity> {
    return await this.blogPostRepository.repost(id, userId);
  }

  public async deletePost(id: string, userId: string): Promise<void> {
    const existsPost = await this.blogPostRepository.findById(id);

    if (existsPost?.userId !== userId) {
      throw new UnauthorizedException(`Post owner is not user with userId: ${userId}`);
    }

    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto, userId: string): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);

    if (existsPost?.userId !== userId) {
      throw new UnauthorizedException(`Post owner is not user with userId: ${userId}`);
    }

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

  public async updatePostStatus(id: string, userId: string): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);

    if (!existsPost) {
      throw new NotFoundException(`Post with id: ${id} is not found`);
    }

    if (existsPost?.userId !== userId) {
      throw new UnauthorizedException(`Post owner is not user with userId: ${userId}`);
    }

    existsPost.isPublished = !existsPost.isPublished;

    return this.blogPostRepository.update(id, existsPost);
  }

  public async toggleLike(id: string, likeId: string): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);

    if (!existsPost.likes) {
      existsPost.likes = []
    }

    if (existsPost.likes.some(value => value === likeId)) {
      existsPost.likes = existsPost.likes.filter(value => value !== likeId);
    } else {
      existsPost.likes.push(likeId);
    }

    return this.blogPostRepository.update(id, existsPost);
  }
}
