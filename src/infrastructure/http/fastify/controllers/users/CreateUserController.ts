// src/infrastructure/http/fastify/controllers/CreateUserController.ts
import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateUserUseCase,
  type CreateUserDTO,
} from '../../../../../application/user/use-cases/CreateUserUseCase';

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as CreateUserDTO;

    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send({
      id: user.id,
      name: user.name,
      email: user.email.getValue(),
    });
  }
}
