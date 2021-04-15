import 'reflect-metadata';

import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';
import AppError from '@shared/errors/AppError';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategory: CreateCategoryService;

describe('CreateCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategory = new CreateCategoryService(fakeCategoriesRepository);
  });
  
  it('should be able to create a category', async () => {
    const category = await createCategory.execute({
      name: 'Foo',
    });
    
    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a category with same name', async () => {
    await createCategory.execute({
      name: 'Foo',
    });
    
    await expect(createCategory.execute({
      name: 'Foo',
    })).rejects.toBeInstanceOf(AppError);
  });
});