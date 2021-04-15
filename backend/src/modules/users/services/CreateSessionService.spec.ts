import 'reflect-metadata';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from '../services/CreateSessionService';
import AppError from '@shared/errors/AppError';


let fakeUserRespository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createSession: CreateSessionService;

describe('SessionService', () => {
  beforeEach(() => {
    fakeUserRespository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionService(
      fakeUserRespository,
      fakeHashProvider,
    );
  });

  it('should be able to create a session', async () => {
    const user = await fakeUserRespository.create({
      name: 'foo',
      email: 'foo2@foo.com',
      password: '123456',
    });
    
    const response = await createSession.execute({
      email: 'foo2@foo.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a session with a non exist user', async () => {
    await expect(createSession.execute({
      email: 'foo2@foo.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session with a wrong password', async () => {
    await fakeUserRespository.create({
      name: 'foo',
      email: 'foo2@foo.com',
      password: 'foo',
    });
    
    await expect(createSession.execute({
      email: 'foo2@foo.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});