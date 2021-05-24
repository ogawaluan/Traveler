import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import City from "../infra/typeorm/entities/City";
import ICitiesRepository from "../repositories/ICitiesRepository";

@injectable()
class ListAllCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(): Promise<City[]> {
    const cities = await this.citiesRepository.findAllCities();

    if (!cities) {
      throw new AppError('Cities not found');
    }

    if (cities.length === 0) {
      throw new AppError('You have no registered cities');
    }

    return cities;
  }
}

export default ListAllCitiesService;