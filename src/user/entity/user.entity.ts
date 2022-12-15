import { Gender } from '@/typings/dto';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseDateDto } from '../../common/dto/base-date.dto';
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

  @Field()
  @Column(() => BaseDateDto)
  date: BaseDateDto;
  // articles: Article[];
}
