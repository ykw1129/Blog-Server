import { IsString } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly content: string;

  // @IsString({ each: true })
  // readonly tags?: string[];
  @IsString()
  readonly tags: string;
}
