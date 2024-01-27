import { Module, forwardRef } from '@nestjs/common';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { PrismaClientModule } from '@project/shared/blog/models';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentRepository } from './blog-comment.repository';

@Module({
  imports: [PrismaClientModule, forwardRef(() => BlogPostModule)],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository],
  exports: [BlogCommentService],
})
export class BlogCommentModule { }
