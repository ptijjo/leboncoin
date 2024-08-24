/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Article } from '@interfaces/articles.interface';
import { ArticleService } from '@/services/articles.service';

export class ArticleController {
  public user = Container.get(ArticleService);

  public getArticles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    } catch (error) {
      next(error);
    }
  };

  public createArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
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
