import { ArticleModule } from './article/article.module';
import { ArticleController } from './article/article.controller';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [ArticleModule, DatabaseModule],
  controllers: [ArticleController, AppController],
  providers: [AppService],
})
export class AppModule {}
