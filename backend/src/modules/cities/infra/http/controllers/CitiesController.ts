import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCityService from "@modules/cities/services/CreateCityService";
import UpdateCityService from "@modules/cities/services/UpdateCityService";
import ListAllCitiesService from "@modules/cities/services/ListAllCitiesService";
import DeleteCityService from "@modules/cities/services/DeleteCityService";

class CitiesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCity = container.resolve(CreateCityService);

    const city = await createCity.execute({
      name,
      image: request.file.filename,
      description,
    });

    return response.json(city);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { city_id, name, description } = request.body;

    const updateCity = container.resolve(UpdateCityService);

    const city = await updateCity.execute({
      city_id,
      name,
      image: request.file.filename,
      description,
    });

    return response.json(city);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllCities = container.resolve(ListAllCitiesService);

    const cities = await listAllCities.execute();

    return response.json(cities);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { city_id } = request.params;
    
    const deleteCityService = container.resolve(DeleteCityService);

    const deletedCity = await deleteCityService.execute({
      city_id
    });

    return response.json(deletedCity);
  }
}

export default CitiesController;