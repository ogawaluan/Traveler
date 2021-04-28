import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Category from "../infra/typeorm/entities/Category";

import ICategoriesRepository from "../repositories/ICategoriesRepository";

interface IRequest {
  category_id: string;
  name: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ category_id, name }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category not found');
    }

    const categoryWithSameName = await this.categoriesRepository.findByName(name);

    if (categoryWithSameName && categoryWithSameName.id !== category_id) {
      throw new AppError('Name already exist');
    }

    category.name = name;

    return this.categoriesRepository.save(category);
  }
}

export default UpdateCategoryService;