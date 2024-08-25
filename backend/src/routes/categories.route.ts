/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { CategoryController } from '@controllers/categories.controller';
import { Routes } from '@interfaces/routes.interface';

export class CategoryRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.category.createCategoryArticle);
    this.router.delete(`${this.path}/:id`, this.category.deleteCategoryArticle);
  }
}
