import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogTagModule } from './blog-tag/blog-tag.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';

@Module({
  imports: [BlogTagModule, BlogPostModule, BlogCommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
