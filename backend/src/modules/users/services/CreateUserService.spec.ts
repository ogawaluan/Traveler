import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../services/CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an exists email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    });

    expect(createUser.execute({
      name: 'Foo',
      email: 'Foo@Foo.com',
      password: 'FooFoo',
    })).rejects.toBeInstanceOf(Error);
  });
});
