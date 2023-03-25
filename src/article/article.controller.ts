/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('文章管理')
@Controller('/article')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}

  // @Public()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.articlesService.findAll(paginationQuery);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(id);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.articlesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articlesService.remove(id);
  }

  @Get('recommend')
  recommendArticle(
    @Query('articleId', ParseIntPipe) articleId: number,
    @Query('userId', ParseIntPipe) userId: number,
  ) {
    console.log(articleId, userId);
    return this.articlesService.recommendArticleById(articleId, userId);
  }
}
