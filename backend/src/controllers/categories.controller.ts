/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Category } from '@interfaces/categories.interface';
import { CategoryService } from '@/services/categories.service';

export class CategoryController {
  public category = Container.get(CategoryService);

  public createCategoryArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryData: Category = req.body;
      const createCategoryArticle: Category = await this.category.createCategory(categoryData);

      res.status(200).json({ data: createCategoryArticle, message: 'Validated article !' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCategoryArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = String(req.params.id);
      const deleteCategoryArticle = await this.category.deleteCategory(categoryId);

      res.status(200).json({ data: deleteCategoryArticle, messsage: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
