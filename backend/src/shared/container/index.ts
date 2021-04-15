import { container } from 'tsyringe';

import '@modules/users/providers/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository', 
  UsersRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository', 
  CategoriesRepository,
);