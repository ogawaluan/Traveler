import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCategoryService from "@modules/categories/services/CreateCategoryService";
import UpdateCategoryService from "@modules/categories/services/UpdateCategoryService";

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      name
    });

    return response.json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { category_id, name } = request.body;

    const updateCategory = container.resolve(UpdateCategoryService);

    const category = await updateCategory.execute({
      category_id,
      name,
    });

    return response.json(category);
  }
}

export default CategoriesController;