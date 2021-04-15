import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an exists email', async () => {
    await createUser.execute({
      name: 'Foo',
      email: 'Foo2@Foo.com',
      password: 'FooFoo',
    });

    await expect(createUser.execute({
      name: 'Foo',
      email: 'Foo2@Foo.com',
      password: 'FooFoo',
    })).rejects.toBeInstanceOf(Error);
  });
});
