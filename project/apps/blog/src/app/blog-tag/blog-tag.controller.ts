import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillDto } from '@project/shared/helpers';
import { BlogTagService } from './blog-tag.service';
import { TagRdo } from './rdo/tag.rdo';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class BlogTagController {
  constructor(
    private readonly blogTagService: BlogTagService,
  ) { }

  @Get('/')
  public async index() {
    const blogTagEntities = await this.blogTagService.getAllTags();
    const tags = blogTagEntities.map(blogTag => blogTag.toPOJO());

    return fillDto(TagRdo, tags);
  }

  @Get('/:id')
  public async show(
    @Param('id')
    id: string,
  ) {
    return this.blogTagService.getTag(id);
  }

  @Post('/')
  public async create(
    @Body()
    dto: CreateTagDto
  ) {
    const newTag = await this.blogTagService.createTag(dto);

    return fillDto(TagRdo, newTag.toPOJO());
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
