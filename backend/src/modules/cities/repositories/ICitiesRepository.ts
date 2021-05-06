import { DeleteResult } from "typeorm";

import City from "../infra/typeorm/entities/City";
import ICreateCityDTO from "../dtos/ICreateCityDTO";

export default interface ICitiesRepository {
  findById(id: string): Promise<City | undefined>;
  findByName(name: string): Promise<City | undefined>;
  findAllCities(): Promise<City[] | undefined>;
  create(data: ICreateCityDTO): Promise<City>;
  save(city: City): Promise<City>;
  delete(id: string): Promise<DeleteResult>;
}