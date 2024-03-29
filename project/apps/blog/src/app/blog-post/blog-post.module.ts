import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/blog/models';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPostRepository } from './blog-post.repository';
import { BlogTagModule } from '../blog-tag/blog-tag.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';

@Module({
  imports: [BlogTagModule, BlogCommentModule, PrismaClientModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository],
  exports: [BlogPostService],
})
export class BlogPostModule { }
