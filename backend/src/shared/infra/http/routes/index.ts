import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/sessions.routes';
import usersRouter from '@modules/users/infra/http/users.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;