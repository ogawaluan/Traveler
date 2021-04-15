import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCategoryService from "@modules/categories/services/CreateCategoryService";

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      name
    });

    return response.json(category);
  }
}

export default CategoriesController;