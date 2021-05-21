import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CitiesController from '../http/controllers/CitiesController';

const citiesRouter = Router();
const citiesController = new CitiesController();
const upload = multer(uploadConfig);

citiesRouter.post('/', upload.single('image'), citiesController.create);
citiesRouter.put('/', upload.single('image'), citiesController.update);

export default citiesRouter;
