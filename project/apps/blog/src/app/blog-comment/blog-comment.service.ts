import { Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogPostService } from '../blog-post/blog-post.service';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BlogCommentQuery } from './query/blog-comment.query';
import { IPagination } from '@project/shared/app/types';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    @Inject(forwardRef(() => BlogPostService))
    private readonly blogPostService: BlogPostService,
  ) { }

  public async getComments(postId: string, query: BlogCommentQuery): Promise<IPagination<BlogCommentEntity>> {
    return this.blogCommentRepository.findByPostId(postId, query);
  }

  public async createComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.blogPostService.getPost(postId);
    const newComment = BlogCommentEntity.fromDto(dto, existsPost.id);

    return this.blogCommentRepository.save(newComment);
  }

  public async deleteComment(id: string, userId: string) {
    const existsComment = await this.blogCommentRepository.findById(id);

    if (existsComment?.userId !== userId) {
      throw new UnauthorizedException(`Comment owner is not user with userId: ${userId}`);
    }

    try {
      await this.blogCommentRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }
  }
}
