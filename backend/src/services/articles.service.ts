/* eslint-disable prettier/prettier */
import { CategoryList, PrismaClient } from '@prisma/client';
import Container, { Service } from 'typedi';
// import { CreateArticleDto } from '@dtos/articles.dto';
import { HttpException } from '@/exceptions/httpException';
import { Article } from '@interfaces/articles.interface';
import { localDate } from '@/utils/localDate';
import { MediaService } from './media.service';
import { CategoryService } from './categories.service';
import { Category } from '@/interfaces/categories.interface';
import { Media } from '@/interfaces/medias.interface';
import { ValidationService } from './validations.service';
import { Validation } from '@/interfaces/validations.interface';

@Service()
export class ArticleService {
  public article = new PrismaClient().article;
  public media = Container.get(MediaService);
  public category = Container.get(CategoryService);
  public validation = Container.get(ValidationService);

  public async findAllArticle(): Promise<Article[]> {
    const allArticle: Article[] = await this.article.findMany({
      include: {
        category: true,
        user: true,
        validation: true,
      },
    });
    return allArticle;
  }

  public async findArticleById(articleId: string): Promise<Article> {
    const findArticle: Article = await this.article.findUnique({ where: { id: articleId } });
    if (!findArticle) throw new HttpException(409, "User doesn't exist");
    return findArticle;
  }

  public async createArticle(
    req: any,
    userId: string,
    articleData: { title: string; description: string; prix: number; nomCategory: CategoryList },
  ): Promise<Article> {
    const created_at = localDate();

    const category: Category = await this.category.findCategoryByName(articleData.nomCategory);

    const validation: Validation = await this.validation.createValidation();

    const createArticleData: Article = await this.article.create({
      data: {
        title: articleData.title,
        description: articleData.description,
        prix: articleData.prix,
        created_at: created_at,
        userId: userId,
        categoryId: category.id,
        validationId: validation.id,
      },
    });

    const media: Media = await this.media.createMedia(req, createArticleData.id);

    const ArticleData: Article = await this.article.update({
      where: {
        id: createArticleData.id,
      },
      data: {
        media: {
          connect: { id: media.id },
        },
      },
    });
    return ArticleData;
  }

  // public async updateUser(userData: CreateArticleDto): Promise<Article> {
  //   return;
  // }

  public async deleteUser(articleId: string): Promise<Article> {
    const findUser: Article = await this.article.findUnique({ where: { id: articleId } });
    if (!findUser) throw new HttpException(409, "Article doesn't exist");
    const deleteUserData = await this.article.delete({ where: { id: articleId } });
    return deleteUserData;
  }
}
