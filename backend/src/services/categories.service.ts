/* eslint-disable prettier/prettier */
import { CategoryList, PrismaClient } from '@prisma/client';
import { Category } from '../interfaces/categories.interface';
import { categoryList } from '@/utils/categoryList';
import { HttpException } from '@/exceptions/httpException';

export class CategoryService {
  public category = new PrismaClient().category;

  public getAllCategory = async (res: any) => {
    const findCategory = await this.category.findMany();

    if (!findCategory) {
      return res.status(400).json(`No address`);
    }

    res.status(200).json(findCategory);

    return findCategory;
  };

  public createCategory = async (categoryData: Category) => {
    const listCategory = categoryList;

    if (!listCategory.includes(categoryData.name)) throw new HttpException(409, "This category doesn't exist !");

    const findCategoryname = await this.category.findUnique({
      where: {
        name: categoryData.name as CategoryList,
      },
    });

    if (findCategoryname) throw new HttpException(409, 'This category already eexist !');

    const newCategory: Category = await this.category.create({
      data: {
        ...categoryData,
        name: categoryData.name as CategoryList,
      },
    });

    return newCategory;
  };
}
