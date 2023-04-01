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
import { User } from '@/user/entity/user.entity';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      throw new HttpException(`文章 #${id} 未找到`, HttpStatus.NOT_FOUND);
    }
    return this.articleRepository.save(article);
  }
  async remove(id: number) {
    const article = await this.articleRepository.findOne({ where: { id: id } });
    return this.articleRepository.remove(article);
  }
  async isRecommendedArticle(articleId: number, referrerId: number) {
    const recommendEvent = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.referrer', 'referrer')
      .where(`event.referrer.id = :referrerId`, { referrerId })
      .andWhere(`event.payload ->>'$.articleId' = :articleId`, { articleId })
      .getOne();
    if (recommendEvent) {
      return true;
    } else {
      return false;
    }
  }
  async recommendArticle(article: Article, referrer: User) {
    const isExist = await this.isRecommendedArticle(article.id, referrer.id);
    if (isExist) {
      throw new HttpException('该文章已经推荐过了', HttpStatus.OK);
    } else {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        article.recommendation++;
        const recommendEvent = new Event();
        recommendEvent.name = 'recommend_article';
        recommendEvent.type = 'article';
        recommendEvent.payload = { articleId: article.id };
        recommendEvent.referrer = referrer;
        await queryRunner.manager.save(article);
        await queryRunner.manager.save(recommendEvent);
        await queryRunner.commitTransaction();
        return { message: '推荐成功' };
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw new HttpException(`推荐失败`, HttpStatus.OK);
      } finally {
        await queryRunner.release();
      }
    }
  }
  async recommendArticleById(articleId: number, referrerId: number) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });
    const referrer = await this.userRepository.findOne({
      where: { id: referrerId },
    });
    if (!article) {
      throw new HttpException(
        `文章 #${articleId} 没找到`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (!referrer) {
      throw new HttpException(
        `用户 #${referrerId} 没找到`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.recommendArticle(article, referrer);
  }
  async preloadTagByName(name: string): Promise<Tag> {
    const existingTag = await this.tagRepository.findOne({
      where: { name: name },
    });
    if (existingTag) {
      return existingTag;
    }
    return this.tagRepository.create({ name });
  }
}
