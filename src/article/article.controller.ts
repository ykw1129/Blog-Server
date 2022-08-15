/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('/article')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}
  @Get()
  findAll(@Param() params: any) {
    const { limit, offset } = params;
    return this.articlesService.findAll({ limit, offset });
  }
}
