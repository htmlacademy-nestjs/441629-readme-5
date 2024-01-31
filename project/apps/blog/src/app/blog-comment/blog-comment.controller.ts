import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared/helpers';

import { BlogCommentService } from './blog-comment.service';
import { BlogCommentRdo } from './rdo/blog-comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { BlogCommentQuery } from './query/blog-comment.query';
import { BlogCommentWithPaginationRdo } from './query/blog-comment-with-pagination.rdo';
import { API } from './blog-comment.constant';

@ApiTags('Blog comment service')
@Controller('posts/:id/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService,
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: API.SHOW,
  })
  @Get('/')
  public async show(
    @Param('id')
    id: string,

    @Query()
    query: BlogCommentQuery,
  ) {
    const commentsWithPagination = await this.blogCommentService.getComments(id, query);
    const result = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map(comment => comment.toPOJO()),
    }

    return fillDto(BlogCommentWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: API.CREATE,
  })
  @Post('/')
  public async create(
    @Param('id')
    id: string,

    @Body()
    dto: CreateCommentDto,
  ) {
    const newComment = await this.blogCommentService.createComment(id, dto);

    return fillDto(BlogCommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: API.DELETE,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/')
  public async delete(
    @Param('id')
    id: string,

    @Body()
    dto: DeleteCommentDto,
  ) {
    await this.blogCommentService.deleteComment(id, dto.userId);
  }
}
