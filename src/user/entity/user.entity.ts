import { Role } from '@/typings/dto';
import { Gender } from '@/typings/dto';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseDateDto } from '../../common/dto/base-date.dto';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '../../article/entities/article.entity';
import { Event } from '@/event/entities/event.entity';

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
  gender: Gender;

  @Field(() => Role)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Field()
  @Column({ nullable: true })
  phone: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({
    nullable: true,
  })
  address: string;

  @Field()
  @Column({
    nullable: true,
  })
  description: string;

  @Field(() => [Article], { nullable: true })
  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @Field(() => [Event], { nullable: true })
  @OneToMany(() => Event, (event) => event.referrer)
  events: Event[];

  @Column(() => BaseDateDto)
  date: BaseDateDto;

  // articles: Article[];
}
