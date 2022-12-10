import { Article } from '@/article/entities/article.entity';
export class User {
  id: number;
  nickName: string;
  gender: string;
  phone: number;
  email: number;
  address: string;
  description: string;
  articles: Article[];
}
