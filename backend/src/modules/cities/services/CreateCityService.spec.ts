import 'reflect-metadata';

import CreateCityService from "./CreateCityService";
import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import AppError from '@shared/errors/AppError';

let fakeCitiesRepository: FakeCitiesRepository;
let createCity: CreateCityService;

describe('CreateCityService', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    createCity = new CreateCityService(fakeCitiesRepository);
  });

  it('should be able to create a city', async () => {
    const city = await createCity.execute({
      name: 'Foo',
      description: 'Foo2',
      image: 'ablubleble',
    });

    expect(city).toHaveProperty('id');
  });

  it('should not be able to create a category with same name', async () => {
    await createCity.execute({
      name: 'Foo',
      description: 'Foo2',
      image: 'ablubleble',
    });
    
    await expect(createCity.execute({
      name: 'Foo',
      description: 'Foo2',
      image: 'ablubleble',
    })).rejects.toBeInstanceOf(AppError);
  });
});