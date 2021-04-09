import { Request, Response } from "express";
import { container } from 'tsyringe';

import CreateSessionService from '@modules/users/services/CreateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    
    const authenticateUser = container.resolve(CreateSessionService);

    const { user, token } = await authenticateUser.execute({
      email,
      password
    });

    //@ts-ignore
    delete user.password;

    return response.json({ user, token });
  }
}