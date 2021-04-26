import { inject, injectable } from "tsyringe";

import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  new_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_id, name, email, old_password, new_password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail && userWithSameEmail.id !== user_id) {
      throw new AppError('email already exist');
    }

    user.name = name;
    user.email = email;

    if (new_password && !old_password) {
      throw new AppError('You need to inform the old password to set the new password');
    }

    if (new_password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(new_password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;