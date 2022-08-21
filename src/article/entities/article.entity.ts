import { Tag } from './tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  recommendation: number;

  @JoinTable()
  @ManyToMany((type) => Tag, (tag) => tag.articles, { cascade: true })
  tags: Tag[];
}
