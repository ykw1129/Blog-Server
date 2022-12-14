import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseDateDto {
  @CreateDateColumn()
  Created: Date;

  @UpdateDateColumn()
  Updated: Date;
}
