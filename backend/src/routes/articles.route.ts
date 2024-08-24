/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { ArticleController } from '@controllers/articles.controller';
import { CreateArticleDto } from '@dtos/articles.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { modo } from '@/middlewares/modo';
import { auth } from '@/middlewares/auth';

export class ArticleRoute implements Routes {
  public path = '/articles';
  public router = Router();
  public user = new ArticleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`);
    this.router.get(`${this.path}/:id`);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateArticleDto));
    this.router.put(`${this.path}/:id`, auth, ValidationMiddleware(CreateArticleDto, true));
    this.router.delete(`${this.path}/:id`, auth);
  }
}
