import { Router } from 'express';

import CategoriesController from '../http/controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.post('/', categoriesController.create);
categoriesRouter.put('/', categoriesController.update);
categoriesRouter.get('/', categoriesController.index);
categoriesRouter.delete('/:category_id', categoriesController.delete);

export default categoriesRouter;