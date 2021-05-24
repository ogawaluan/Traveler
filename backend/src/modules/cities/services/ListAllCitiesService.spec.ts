import AppError from "@shared/errors/AppError";
import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import ListAllCitiesService from "./ListAllCitiesService";

let fakeCitiesRepository: FakeCitiesRepository;
let listAllCitiesService: ListAllCitiesService;

describe('ListAllCitiesService', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    listAllCitiesService = new ListAllCitiesService(
      fakeCitiesRepository,
    );
  });

  it('should be able to list all cities', async () => {
    await fakeCitiesRepository.create({
      name: 'Foo1',
      description: 'foo1',
      image: 'Foo.png',
    });

    await fakeCitiesRepository.create({
      name: 'Foo2',
      description: 'foo2',
      image: 'Foo2.png',
    });

    const cities = await listAllCitiesService.execute();

    expect(cities.length >= 2).toBeTruthy();
  });

  it('should not be able to list the cities if length have 0', async () => {
    await expect(listAllCitiesService.execute()).rejects.toBeInstanceOf(AppError);
  });
});