import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  findAll({ limit, offset }: any) {
    return { limit, offset };
  }
}
