/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Article } from '@interfaces/articles.interface';
import { ArticleService } from '@/services/articles.service';
import { Category } from '@/interfaces/categories.interface';
import { CategoryService } from '@/services/categories.service';
import { ValidationService } from '@/services/validations.service';
import { Validation } from '@/interfaces/validations.interface';

export class ArticleController {
  public article = Container.get(ArticleService);
  public category = Container.get(CategoryService);
  public validation = Container.get(ValidationService);

  public findAllArticles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allArticle: Article[] = await this.article.findAllArticle();
      res.status(200).json({ data: allArticle, message: 'findall' });
    } catch (error) {
      next(error);
    }
  };

  public findOneArticleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articleId = req.params.id;
      const findArticle: Article = await this.article.findUserById(articleId);
      res.status(200).json({ data: findArticle, messssage: 'FindOne' });
    } catch (error) {
      next(error);
    }
  };

  public createArticle = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articleData: { title: string; description: string; prix: number } = req.body;
      const userId = req.auth.userId as string;

      const findCategory: Category = await this.category.findCategoryByName(req.body.category);

      const validation: Validation = await this.validation.createValidation();

      const newArticle: Article = await this.article.createArticle(userId, validation.id, findCategory.id, articleData);

      res.status(201).json({ data: newArticle, message: 'article created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
