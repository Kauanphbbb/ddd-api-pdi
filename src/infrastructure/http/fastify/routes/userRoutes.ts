import { type FastifyInstance } from 'fastify';

import { UserRepositoryInMemory } from '@infrastructure/database/UserRepositoryInMemory';
import { CreateUserController } from '@infrastructure/http/fastify/controllers/users/CreateUserController';

import { BcryptHashPass } from '@application/user/services/BcryptHashPass';
import { CreateUserUseCase } from '@application/user/use-cases/CreateUserUseCase';

const userRepo = new UserRepositoryInMemory();

const createUserUseCase = new CreateUserUseCase(userRepo, new BcryptHashPass());

const createUserController = new CreateUserController(createUserUseCase);

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUserController.handle);
}
