import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import categoriesRouter from '@modules/categories/infra/http/categories.routes';
import citiesRouter from '@modules/cities/infra/http/cities.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/categories', categoriesRouter);
routes.use('/cities', citiesRouter);

export default routes;