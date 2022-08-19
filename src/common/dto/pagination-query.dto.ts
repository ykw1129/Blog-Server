import { Type } from 'class-transformer';
import { IsOptional, isPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @isPositive()
  limit: number;

  @IsOptional()
  @isPositive()
  offset: number;
}
