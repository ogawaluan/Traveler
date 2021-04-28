import 'reflect-metadata';

import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';
import UpdateCategoryService from './UpdateCategoryService';
import AppError from '@shared/errors/AppError';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategory: CreateCategoryService;
let updateCategory: UpdateCategoryService;

describe('UpdateCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategory = new CreateCategoryService(fakeCategoriesRepository);
    updateCategory = new UpdateCategoryService(fakeCategoriesRepository);
  });
  
  it('should be able to update a category', async () => {
    const category = await createCategory.execute({
      name: 'Foo',
    });

    const updatedCategory = await updateCategory.execute({
      category_id: category.id,
      name: 'Foo2',
    });
    
    expect(category.name).toBe('Foo2');
  });

  it('should not be able to update from a non-existing category', async () => {
    await expect(updateCategory.execute({
      category_id: 'ablublubleble',
      name: 'Luanzo',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another category name', async () => {
    await fakeCategoriesRepository.create({
      name: 'Lobby',
    });

    const category = await fakeCategoriesRepository.create({
      name: 'Agogo',
    });

    await expect(updateCategory.execute({
      category_id: category.id,
      name: 'Lobby',
    })).rejects.toBeInstanceOf(AppError);
  });
});