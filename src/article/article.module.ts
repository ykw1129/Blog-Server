import { User } from '@/user/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { Article } from './entities/article.entity';
import { Tag } from './entities/tag.entity';
import { Event } from '../event/entities/event.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ArticleResolver } from './article.resolver';
import { ConfigModule } from '@nestjs/config';
import articleConfig from './config/article.config';
@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Tag, Event, User]),
    ConfigModule.forFeature(articleConfig),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleResolver],
})
export class ArticleModule {}
