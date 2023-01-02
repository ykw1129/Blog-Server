import { Field } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseDateDto {
  @Field()
  @CreateDateColumn()
  Created: Date;

  @Field()
  @UpdateDateColumn()
  Updated: Date;
}
