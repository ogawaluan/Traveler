import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import ICategoriesRepository from "../repositories/ICategoriesRepository";

interface IRequest {
  category_id: string;
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ category_id }: IRequest): Promise<any> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category not found');
    }

    return await this.categoriesRepository.delete(category.id);
  }
}

export default DeleteCategoryService;