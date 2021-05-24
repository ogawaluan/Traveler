import { inject, injectable } from "tsyringe";

import City from "../infra/typeorm/entities/City";
import AppError from "@shared/errors/AppError";
import ICitiesRepository from "../repositories/ICitiesRepository";

interface IRequest {
  city_id: string;
}

@injectable()
class DeleteCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({ city_id }: IRequest): Promise<City> {
    const city = await this.citiesRepository.findById(city_id);

    if (!city) {
      throw new AppError('City not found');
    }

    await this.citiesRepository.delete(city_id);

    return city;
  }
}

export default DeleteCityService;