/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('/article')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}

  @Get()
  findAll(@Query() params: any) {
    const { limit, offset } = params;
    return this.articlesService.findAll({ limit, offset });
  }
  @Get()
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }
}
