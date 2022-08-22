import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article.entity';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => [Article], { nullable: true })
  @ManyToMany((type) => Article, (article) => article.tags)
  articles: Article[];
}
