import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class Photo {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ length: 500 })
  name: string;

  @Field({ nullable: true })
  @Column('text')
  description: string;

  @Field({ nullable: true })
  @Column()
  filename?: string;

  @Field({ nullable: true })
  @Column('int')
  views: number;

  @Field()
  @Column()
  isPublished: boolean;
}
