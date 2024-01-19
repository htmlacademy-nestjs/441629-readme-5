import { Module } from '@nestjs/common';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { PrismaClientModule } from '@project/shared/blog/models';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentRepository } from './blog-comment.repository';

@Module({
  imports: [BlogPostModule, PrismaClientModule],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository],
})
export class BlogCommentModule { }
