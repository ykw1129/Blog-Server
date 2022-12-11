import { Gender } from '@/typings/dto.d';
import { Article } from '@/article/entities/article.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  nickName: string;

  @Field(() => Gender)
  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.secret,
  })
  gender: string;

  @Field(() => Int)
  @Column()
  phone: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  description: string;

  // articles: Article[];
}
