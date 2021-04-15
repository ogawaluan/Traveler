import Category from '../infra/typeorm/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

export default interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | undefined>
  findAllCategories(): Promise<Category[] | undefined>;
}