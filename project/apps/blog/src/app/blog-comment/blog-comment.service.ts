import { Injectable } from '@nestjs/common';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogPostService } from '../blog-post/blog-post.service';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogPostService: BlogPostService,
  ) { }

  public async getComments(postId: string): Promise<BlogCommentEntity[]> {
    return this.blogCommentRepository.findByPostId(postId);
  }

  public async createComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.blogPostService.getPost(postId);
    const newComment = BlogCommentEntity.fromDto(dto, existsPost.id);

    return this.blogCommentRepository.save(newComment);
  }
}
