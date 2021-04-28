import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Category from "../infra/typeorm/entities/Category";
import ICategoriesRepository from "../repositories/ICategoriesRepository";

@injectable()
class ListAllCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAllCategories();

    if (!categories) {
      throw new AppError('Categories not found');
    }

    return categories;
  }
}

export default ListAllCategoriesService;