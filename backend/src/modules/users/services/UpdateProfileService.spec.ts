import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../services/CreateUserService';
import UpdateProfileService from '../services/UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let updateUser: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    updateUser = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update a user', async () => {
    const user = await createUser.execute({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: 'Foo2',
      email: 'Foo@foo2.com',
    });

    expect(user.name).toBe('Foo2');
    expect(user.email).toBe('Foo@foo2.com');
  });

  it('should not be able to update from non-existing user', async () => {
    await expect(updateUser.execute({
      user_id: 'pikachu pikachu',
      name: 'pokemon pokemon',
      email: 'pokemon@pikachu.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'pikachu',
      email: 'pokemon@pikachu.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'pipipipika',
      email: 'pipi@pikachu.com',
      password: '123456',
    });

    await expect(updateUser.execute({
      user_id: user.id,
      name: 'pikachu',
      email: 'pokemon@pikachu.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await createUser.execute({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    const updatedUser = await updateUser.execute({
      user_id: user.id,
      name: 'Foo2',
      email: 'Foo@foo2.com',
      old_password: 'FooFoo',
      new_password: 'FooFoo2',
    });

    expect(user.password).toBe('FooFoo2');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await createUser.execute({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    await expect(updateUser.execute({
      user_id: user.id,
      name: 'Foo2',
      email: 'Foo@foo2.com',
      new_password: 'FooFoo2',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await createUser.execute({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    await expect(updateUser.execute({
      user_id: user.id,
      name: 'Foo2',
      email: 'Foo@foo2.com',
      old_password: 'FooFoo3',
      new_password: 'FooFoo2',
    })).rejects.toBeInstanceOf(AppError);
  });
});
