import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Tag } from './entities/tag.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from '../event/entities/event.entity';
import { ConfigService, ConfigType } from '@nestjs/config';
import articleConfig from './config/article.config';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly connection: DataSource,
    @Inject(articleConfig.KEY)
    private readonly articleConfiguration: ConfigType<typeof articleConfig>,
  ) {
    console.log(articleConfiguration.foo);
  }
  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    const list = await this.articleRepository.find({
      relations: ['tags'],
      skip: offset,
      take: limit,
    });
    return { list };
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
  async recommendArticle(article: Article) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      article.recommendation++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_article';
      recommendEvent.type = 'article';
      recommendEvent.payload = { articleId: article.id };
      await queryRunner.manager.save(article);
      await queryRunner.manager.save(recommendEvent);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
