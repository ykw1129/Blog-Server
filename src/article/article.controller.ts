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

@Controller('/article')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}

  @Get()
  findAll(@Query() params: any) {
    const { limit, offset } = params;
    return this.articlesService.findAll({ limit, offset });
  }
  @Get()
  findOne(@Param('id') id: number) {
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
}
