/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Article } from '@interfaces/articles.interface';
import { ArticleService } from '@/services/articles.service';
import { CategoryList } from '@prisma/client';

export class ArticleController {
  public article = Container.get(ArticleService);

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
      const findArticle: Article = await this.article.findArticleById(articleId);
      res.status(200).json({ data: findArticle, messssage: 'FindOne' });
    } catch (error) {
      next(error);
    }
  };

  public createArticle = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.auth.userId;
      const articleData: { title: string; description: string; prix: number; nomCategory: CategoryList } = req.body;

      const article: Article = await this.article.createArticle(req, userId, articleData);

      res.status(201).json({ data: article, message: 'article created' });
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
