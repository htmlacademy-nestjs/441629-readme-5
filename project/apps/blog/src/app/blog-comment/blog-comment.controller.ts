import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { fillDto } from '@project/shared/helpers';
import { BlogCommentRdo } from './rdo/blog-comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { BlogCommentQuery } from './query/blog-comment.query';
import { BlogCommentWithPaginationRdo } from './query/blog-comment-with-pagination.rdo';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blog comment service')
@Controller('posts/:id/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService,
  ) { }

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
