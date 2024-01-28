import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillDto } from '@project/shared/helpers';
import { BlogTagService } from './blog-tag.service';
import { TagRdo } from './rdo/tag.rdo';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Blog tag service')
@Controller('tags')
export class BlogTagController {
  constructor(
    private readonly blogTagService: BlogTagService,
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get list of tags',
  })
  @Get('/')
  public async index() {
    const blogTagEntities = await this.blogTagService.getAllTags();
    const tags = blogTagEntities.map(blogTag => blogTag.toPOJO());

    return fillDto(TagRdo, tags);
  }

  @ApiResponse({
    description: 'Get tag by id',
  })
  @Get('/:id')
  public async show(
    @Param('id')
    id: string,
  ) {
    return this.blogTagService.getTag(id);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create list of tags',
  })
  @Post('/')
  public async create(
    @Body()
    dto: CreateTagDto,
  ) {
    const tagsList = await this.blogTagService.createTags(dto);

    return tagsList.map(tag => tag.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(
    @Param('id')
    id: string,
  ) {
    await this.blogTagService.deleteTag(id);
  }

  @Patch('/:id')
  public async update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateTagDto,
  ) {
    const updatedTag = await this.blogTagService.updateTag(id, dto);

    return fillDto(TagRdo, updatedTag.toPOJO());
  }
}
