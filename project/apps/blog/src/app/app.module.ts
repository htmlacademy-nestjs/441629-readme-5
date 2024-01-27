import { Module } from '@nestjs/common';

import { BlogTagModule } from './blog-tag/blog-tag.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';

@Module({
  imports: [BlogTagModule, BlogCommentModule, BlogPostModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
