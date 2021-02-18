import { Router } from 'express';

const sessionsRouter = Router();

sessionsRouter.post('/', (request, response) => {
  return response.json({ message: "hello world" });
});

export default sessionsRouter;