import { ArticleService } from './article.service';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
