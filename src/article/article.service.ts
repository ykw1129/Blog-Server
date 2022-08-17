import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  private articles = [];
  findAll({ limit, offset }: any) {
    return { limit, offset };
  }
  findOne(id: string) {
    const article = this.articles.find((article) => article.id === id);
    if (!article) {
      throw new HttpException(`Article #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return;
  }
  create(createArticleDto: CreateArticleDto) {
    return createArticleDto;
  }
}
