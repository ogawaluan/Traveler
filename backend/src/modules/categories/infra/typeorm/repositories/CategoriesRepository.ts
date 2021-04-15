import { getRepository, Repository } from "typeorm";

import Category from "../entities/Category";
import ICategoriesRepository from "@modules/categories/repositories/ICategoriesRepository";
import ICreateCategoryDTO from "@modules/categories/dtos/ICreateCategoryDTO";

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { name },
    });

    return category;
  }

  public async findAllCategories(): Promise<Category[] | undefined> {
    const categories = await this.ormRepository.find();

    return categories || undefined;
  }

  public async create({ name }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name
    });

    await this.ormRepository.save(category);

    return category;
  }
}

export default CategoriesRepository;