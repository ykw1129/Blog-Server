import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { Article } from './entities/article.entity';
import { Tag } from './entities/tag.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Article, Tag])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
