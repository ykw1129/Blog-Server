import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Article, (article) => article.tags)
  articles: Article[];
}
