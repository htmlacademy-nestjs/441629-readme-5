import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/user-id.interceptor';
import { AddNewPostDto } from './dto/blog/add-new-post.dto';
import { ApplicationServiceURL } from './app.config';
import { UpdatePostDto } from './dto/blog/update-post.dto';
import { CreateCommentDto } from './dto/blog/create-comment.dto';
import { SeachPostsDto } from './dto/blog/search-post.dto';
import { UserIdDto } from './dto/user-id.dto';
import { createQuery } from './utils/create-query.util';
import { ApiQueryOptions, ApiTags } from '@nestjs/swagger';

@ApiTags('Blog routes')
@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  @Get('/')
  public async index(
    @Query()
    query: ApiQueryOptions,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${createQuery(query)}`);

      const users = new Set;

      data?.entities?.forEach(item => {
        users.add(item.userId);
      });

      const res = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/info`, { ids: Array.from(users) });

      const list = res.data;

      data.entities.forEach(item => {
        item.user = res.data[item.userId];
        item.likes = item.likes.length;
      })

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @Get('/search')
  public async search(
    @Query()
    query: SeachPostsDto,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/search?${query.substring}`);

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Get('/:id')
  public async details(
    @Param('id')
    id: string,

    @Req()
    request: Request,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`, {
        headers: {
          'Authorization': request.headers['authorization'],
        }
      });

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(
    @Body()
    dto: AddNewPostDto,
  ) {
    try {
      const tagsRes = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tags}/`, { titles: dto.tags });

      dto.tags = tagsRes.data.map(item => item.id);

      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/repost/:id')
  public async repost(
    @Param('id')
    id: string,

    @Body()
    dto: UserIdDto,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/repost/${id}`, dto);

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch('/:id')
  public async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdatePostDto,
  ) {
    try {
      const res = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}`, dto);

      return res.data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch('/status/:id')
  public async status(
    @Param('id')
    id: string,

    @Body()
    dto: UserIdDto,
  ) {
    try {
      const res = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/status/${id}`, dto);

      return res.data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Patch('/like/:id')
  public async like(
    @Param('id')
    id: string,

    @Body()
    dto: UserIdDto,
  ) {
    try {
      const res = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/like/${id}`, dto);

      return res.data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Delete('/:id')
  public async delete(
    @Param('id')
    id: string,

    @Body()
    dto: UserIdDto,
  ) {
    try {
      const res = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}`, {
        data: {
          userId: dto.userId,
        },
      });

      return res.data
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @Get('/:id/comments')
  public async comments(
    @Param('id')
    id: string,

    @Query()
    query: ApiQueryOptions,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}/comments/${createQuery(query)}`);

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/:id/comments')
  public async comment(
    @Param('id')
    id: string,

    @Body()
    dto: CreateCommentDto,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${id}/comments`, dto);

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Delete('/:id/comments')
  public async deleteComment(
    @Param('id')
    id: string,

    @Body()
    dto: UserIdDto,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}/comments`, {
        data: {
          userId: dto.userId,
        },
      });

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }
}
