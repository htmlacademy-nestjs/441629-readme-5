import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BlogController } from './blog.controller';
import { UsersController } from './users.controller';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { TagsController } from './tags.controller';
import { FileController } from './file.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [
    BlogController,
    UsersController,
    TagsController,
    FileController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule { }
