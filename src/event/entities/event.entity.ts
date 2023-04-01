import { User } from '@/user/entity/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index(['name', 'type'])
@Entity()
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column()
  name: string;

  @Column('simple-json')
  payload: { articleId: number; message?: string };

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.events)
  referrer: User;
}
