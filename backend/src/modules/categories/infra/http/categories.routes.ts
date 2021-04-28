import { Router } from 'express';

import CategoriesController from '../http/controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.post('/', categoriesController.create);
categoriesRouter.put('/', categoriesController.update);
categoriesRouter.get('/', categoriesController.show);

export default categoriesRouter;