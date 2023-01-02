import { User } from '@/user/entity/user.entity';
import { IsNumber, IsString } from 'class-validator';
export class CreateArticleDto {
  @IsNumber()
  readonly author: Pick<User, 'id'>;

  @IsString()
  readonly name: string;

  @IsString()
  readonly content: string;

  @IsString({ each: true })
  readonly tags: string[];
  // @IsString()
  // readonly tags: string[];
}
