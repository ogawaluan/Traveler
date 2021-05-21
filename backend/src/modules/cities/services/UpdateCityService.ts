import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import City from "../infra/typeorm/entities/City";
import ICitiesRepository from "../repositories/ICitiesRepository";

interface IRequest {
  city_id: string;
  name: string;
  image: string;
  description: string;
}

@injectable()
class UpdateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    city_id,
    name,
    image,
    description,
  }: IRequest): Promise<City> {
    const city = await this.citiesRepository.findById(city_id);

    if (!city) {
      throw new AppError('City not found');
    }

    const cityWithSameName = await this.citiesRepository.findByName(name);

    if (cityWithSameName && cityWithSameName.id !== city_id) {
      throw new AppError('Name already exist');
    }

    if (city.image) {
      await this.storageProvider.deleteFile(city.image);
    }

    const fileName = await this.storageProvider.saveFile(image);

    city.name = name;
    city.image = fileName;
    city.description = description;

    await this.citiesRepository.save(city);

    return city;
  }
}

export default UpdateCityService;