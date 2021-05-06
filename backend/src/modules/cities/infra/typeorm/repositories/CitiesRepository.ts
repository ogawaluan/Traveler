import { DeleteResult, getRepository, Repository } from "typeorm";

import City from "../entities/City";
import ICitiesRepository from "@modules/cities/repositories/ICitiesRepository";
import ICreateCityDTO from "@modules/cities/dtos/ICreateCityDTO";

class CitiesRepository implements ICitiesRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }

  public async findById(id: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne(id);

    return city;
  }

  public async findByName(name: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne({
      where: { name },
    });

    return city;
  }

  public async findAllCities(): Promise<City[] | undefined> {
    const cities = await this.ormRepository.find();

    return cities;
  }

  public async create({ name, image, description }: ICreateCityDTO): Promise<City> {
    const city = this.ormRepository.create({
      name,
      image,
      description,
    });

    await this.ormRepository.save(city);

    return city;
  }

  public async save(city: City): Promise<City> {
    return await this.ormRepository.save(city);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.ormRepository.delete({ id });
  }
}

export default CitiesRepository;