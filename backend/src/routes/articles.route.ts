/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { ArticleController } from '@controllers/articles.controller';
import { CreateArticleDto } from '@dtos/articles.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { auth } from '@/middlewares/auth';
import media from '@/middlewares/media';

export class ArticleRoute implements Routes {
  public path = '/articles';
  public router = Router();
  public article = new ArticleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.article.findAllArticles, this.article.findAllArticles);
    this.router.get(`${this.path}/:id`, this.article.findOneArticleById, this.article.findOneArticleById);
    this.router.post(`${this.path}`, auth,media, ValidationMiddleware(CreateArticleDto), this.article.createArticle);
    this.router.put(`${this.path}/:id`, auth, ValidationMiddleware(CreateArticleDto, true));
    this.router.delete(`${this.path}/:id`, auth);
  }
}
