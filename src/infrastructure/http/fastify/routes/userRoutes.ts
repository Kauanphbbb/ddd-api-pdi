import { type FastifyInstance } from 'fastify';

import { UserRepositoryInMemory } from '@infrastructure/database/UserRepositoryInMemory';
import { CreateUserController } from '@infrastructure/http/fastify/controllers/users/CreateUserController';

import { CreateUserUseCase } from '@application/user/use-cases/CreateUserUseCase';

const userRepo = new UserRepositoryInMemory();

const createUserUseCase = new CreateUserUseCase(userRepo);

const createUserController = new CreateUserController(createUserUseCase);

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUserController.handle);
}
