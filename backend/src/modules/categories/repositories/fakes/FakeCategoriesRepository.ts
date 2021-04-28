import { v4 as uuid } from "uuid";

import ICategoriesRepository from "@modules/categories/repositories/ICategoriesRepository";
import Category from "../../infra/typeorm/entities/Category";
import ICreateCategoryDTO from "@modules/categories/dtos/ICreateCategoryDTO";

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findById(id: string): Promise<Category | undefined> {
    const findCategory = this.categories.find(category => category.id === id);

    return findCategory;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const findCategory = this.categories.find(category => category.name === name);

    return findCategory;
  }

  public async findAllCategories(): Promise<Category[] | undefined> {
    return this.categories;
  }

  public async create(categoryData: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid() }, categoryData);

    this.categories.push(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    const findIndex = this.categories.findIndex(findCategory => findCategory.id === category.id);

    this.categories[findIndex] = category;

    return category;
  }
}

export default FakeCategoriesRepository;