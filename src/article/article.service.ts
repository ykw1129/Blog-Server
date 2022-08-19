import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  findAll({ limit, offset }: any) {
    return this.articleRepository.find({
      relations: ['tags'],
    });
  }
  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id: id },
      relations: ['tags'],
    });
    if (!article) {
      throw new HttpException(`Article #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return article;
  }
  async create(createArticleDto: CreateArticleDto) {
    const tags = await Promise.all(
      createArticleDto.tags.map((name) => this.preloadTagByName(name)),
    );
    const article = this.articleRepository.create({
      ...createArticleDto,
      tags,
    });
    return this.articleRepository.save(article);
  }
  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const tags =
      updateArticleDto.tags &&
      (await Promise.all(
        updateArticleDto.tags.map((name) => this.preloadTagByName(name)),
      ));
    const article = await this.articleRepository.preload({
      id: +id,
      ...updateArticleDto,
      tags,
    });
    if (!article) {
      throw new HttpException(`Article #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return this.articleRepository.save(article);
  }
  async remove(id: number) {
    const article = await this.articleRepository.findOne({ where: { id: id } });
    return this.articleRepository.remove(article);
  }
  private async preloadTagByName(name: string): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({
      where: { name: name },
    });
    if (existingTag) {
      return existingTag;
    }
    return this.tagRepository.create({ name });
  }
}
