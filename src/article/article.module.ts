import { ArticleService } from './article.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
