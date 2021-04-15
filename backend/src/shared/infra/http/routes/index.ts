import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/sessions.routes';
import usersRouter from '@modules/users/infra/http/users.routes';

import categoriesRouter from '@modules/categories/infra/http/categories.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);

export default routes;