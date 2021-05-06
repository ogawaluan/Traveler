import { v4 as uuid } from "uuid";

import City from "@modules/cities/infra/typeorm/entities/City";
import ICreateCityDTO from "@modules/cities/dtos/ICreateCityDTO";
import ICitiesRepository from "../ICitiesRepository";

class FakeCitiesRepository implements ICitiesRepository {
  private cities: City[] = [];

  public async findById(id: string): Promise<City | undefined> {
    const findCity = this.cities.find(city => city.id === id);

    return findCity;
  }

  public async findByName(name: string): Promise<City | undefined> {
    const findCity = this.cities.find(city => city.name === name);

    return findCity;
  }

  public async findAllCities(): Promise<City[] | undefined> {
    return this.cities;
  }

  public async create(cityData: ICreateCityDTO): Promise<City> {
    const city = new City();

    Object.assign(city, { id: uuid(), }, cityData);
    
    this.cities.push(city);

    return city;
  }

  public async save(city: City): Promise<City> {
    const findIndex = this.cities.findIndex(findCity => findCity.id === city.id);

    this.cities[findIndex] = city;

    return city;
  }

  public async delete(id: string): Promise<any> {
    const findIndex = this.cities.findIndex(findCity => findCity.id === id);

    return this.cities.splice(findIndex, 1);
  }
}

export default FakeCitiesRepository;