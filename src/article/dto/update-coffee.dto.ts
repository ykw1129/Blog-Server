import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

export class UpdateCoffeeDto extends PartialType(CreateArticleDto) {}
// 将属性全部变为可选
