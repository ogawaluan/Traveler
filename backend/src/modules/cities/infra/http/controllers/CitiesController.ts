import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCityService from "@modules/cities/services/CreateCityService";

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
}

export default CitiesController;