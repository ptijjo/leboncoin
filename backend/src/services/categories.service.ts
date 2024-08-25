/* eslint-disable prettier/prettier */
import { CategoryList, PrismaClient } from '@prisma/client';
import { Category } from '../interfaces/categories.interface';
import { categoryList } from '@/utils/categoryList';
import { HttpException } from '@/exceptions/httpException';
import { Service } from 'typedi';

@Service()
export class CategoryService {
  public category = new PrismaClient().category;

  public findCategoryByName = async (categoryData: CategoryList): Promise<Category> => {
    const findCategory: Category = await this.category.findUnique({
      where: {
        name: categoryData,
      },
    });

    return findCategory;
  };

  public createCategory = async (categoryData: Category): Promise<Category> => {
    const listCategory = categoryList;

    if (!listCategory.includes(categoryData.name)) throw new HttpException(409, "This category doesn't exist !");

    const findCategoryname = await this.category.findUnique({
      where: {
        name: categoryData.name as CategoryList,
      },
    });

    if (findCategoryname) throw new HttpException(409, 'This category already exist !');

    const newCategory: Category = await this.category.create({
      data: {
        name: categoryData.name as CategoryList,
      },
    });

    return newCategory;
  };

  public deleteCategory = async (categoryId: string): Promise<Category> => {
    const findCategory: Category = await this.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!findCategory) throw new HttpException(409, 'This category already exist !');

    const deleteElem = await this.category.delete({ where: { id: findCategory.id } });

    return deleteElem;
  };
}
