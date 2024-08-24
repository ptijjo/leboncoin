/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreateArticleDto } from '@dtos/articles.dto';
import { HttpException } from '@/exceptions/httpException';
import { Article } from '@interfaces/articles.interface';
import { localDate } from '@/utils/localDate';

@Service()
export class ArticleService {
  public article = new PrismaClient().article;
  public async findAllArticle(): Promise<Article[]> {
    const allArticle: Article[] = await this.article.findMany();
    return allArticle;
  }
  public async findUserById(userId: string): Promise<Article> {
    const findUser: Article = await this.article.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    return findUser;
  }
  public async createArticle(userId: string, validationId: string, categoryId: string, articleData: CreateArticleDto): Promise<Article> {
    const created_at = localDate();
    const createArticleData = await this.article.create({
      data: {
        ...articleData,
        created_at,
        user: {
          connect: { id: userId },
        },
        category: {
          connect: { id: categoryId },
        },
        validation: {
          connect: { id: validationId },
        },
      },
    });
    return createArticleData;
  }
  public async updateUser(userData: CreateArticleDto): Promise<Article> {
    return;
  }
  public async deleteUser(articleId: string): Promise<Article> {
    const findUser: Article = await this.article.findUnique({ where: { id: articleId } });
    if (!findUser) throw new HttpException(409, "Article doesn't exist");
    const deleteUserData = await this.article.delete({ where: { id: articleId } });
    return deleteUserData;
  }
}
