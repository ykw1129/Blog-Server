import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article.entity';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Article], { nullable: true })
  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
