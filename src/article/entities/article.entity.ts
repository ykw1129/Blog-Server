import { Tag } from './tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { type } from 'os';

@Entity()
@ObjectType()
export class Article {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  content: string;

  @Field((type) => Int, { nullable: true })
  @Column({ default: 0 })
  recommendation: number;

  @Field((type) => [Tag], { nullable: true })
  @JoinTable()
  @ManyToMany((type) => Tag, (tag) => tag.articles, { cascade: true })
  tags: Tag[];
}
