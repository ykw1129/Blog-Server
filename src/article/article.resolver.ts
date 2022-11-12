import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Article } from './entities/article.entity';
import { ArticleService } from './article.service';

@Resolver((of) => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query((returns) => Article)
  async article(@Args('id', { type: () => Int }) id: number) {
    return this.articleService.findOne(id);
  }
}
