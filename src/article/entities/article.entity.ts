import { Tag } from './tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Article {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  content: string;

  @Field(() => Int, { nullable: true })
  @Column({ default: 0 })
  recommendation: number;

  @Field(() => [Tag], { nullable: true })
  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true })
  tags: Tag[];
}
