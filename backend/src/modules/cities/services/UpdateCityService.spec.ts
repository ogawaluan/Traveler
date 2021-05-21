import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";
import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import CreateCityService from "./CreateCityService";
import UpdateCityService from "./UpdateCityService";

let fakeCitiesRepository: FakeCitiesRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateCityService: UpdateCityService;

describe('UpdateCityService', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateCityService = new UpdateCityService(
      fakeCitiesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update a city', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'Foo',
      description: 'foo',
      image: 'AloMarciano.png',
    });

    const updatedCity = await updateCityService.execute({
      city_id: city.id,
      name: 'Foo2',
      description: 'foo2',
      image: 'AloMarciano.png',
    });

    expect(updatedCity.name).toBe('Foo2');
  });

  it('should not be able to update a city with a non-existing city', async () => {
    await expect(updateCityService.execute({
      city_id: 'ablublubleble',
      name: 'Luanzo',
      description: 'Foo2',
      image: 'ablbublele.pnmg',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another city name', async () => {
    await fakeCitiesRepository.create({
      name: 'Foo',
      description: 'foo2',
      image: 'ablublbeble.png',
    });

    const city = await fakeCitiesRepository.create({
      name: 'Familia',
      description: 'familia',
      image: 'ableublele.png',
    });

    await expect(updateCityService.execute({
      city_id: city.id,
      name: 'Foo',
      description: 'abebebe',
      image: 'abebebe.png',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old image when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const city = await fakeCitiesRepository.create({
      name: 'Foo',
      description: 'foo2',
      image: 'ablublelea.png',
    });

    await updateCityService.execute({
      city_id: city.id,
      name: 'Foo2',
      description: 'foo2',
      image: 'owyeah.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('ablublelea.png');
    expect(city.image).toBe('owyeah.png');
  });
});