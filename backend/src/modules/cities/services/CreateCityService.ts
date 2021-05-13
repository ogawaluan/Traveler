import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import City from "../infra/typeorm/entities/City";
import ICitiesRepository from "../repositories/ICitiesRepository";

interface IRequest {
  name: string;
  image: string;
  description: string;
}

@injectable()
class CreateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({ name, image, description }: IRequest): Promise<City> {
    const checkCityExist = await this.citiesRepository.findByName(name);

    if (checkCityExist) {
      throw new AppError('City already exist');
    }

    const city = await this.citiesRepository.create({
      name,
      image,
      description
    });

    return city;
  }
}

export default CreateCityService;