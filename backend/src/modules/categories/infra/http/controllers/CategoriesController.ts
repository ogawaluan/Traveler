import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCategoryService from "@modules/categories/services/CreateCategoryService";
import UpdateCategoryService from "@modules/categories/services/UpdateCategoryService";
import ListAllCategoriesService from "@modules/categories/services/ListAllCategoriesService";
import DeleteCategoryService from "@modules/categories/services/DeleteCategoryService";

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    console.log(request.body);

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({
      name
    });

    return response.json(category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const showCategories = container.resolve(ListAllCategoriesService);

    const categories = await showCategories.execute();

    return response.json(categories);
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.body;

    const deleteCategory = container.resolve(DeleteCategoryService);

    await deleteCategory.execute({
      category_id,
    });

    return response.json({ message: "category deleted" });
  }
}

export default CategoriesController;