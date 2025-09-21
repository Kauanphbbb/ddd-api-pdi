import type { FastifyReply, FastifyRequest } from 'fastify';

import {
  CreateUserDTO,
  CreateUserUseCase,
} from '@application/user/use-cases/CreateUserUseCase';

export class CreateUserController {
  public constructor(private readonly createUserUseCase: CreateUserUseCase) {
    this.handle = this.handle.bind(this);
  }

  public async handle(request: FastifyRequest, reply: FastifyReply) {
    if (!request.body) {
      return reply.status(400).send({
        error: 'Dados inválidos.',
      });
    }

    const { name, email, password } = request.body as CreateUserDTO;

    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send({
      id: user.id.getValue(),
      name: user.name,
      email: user.email.getValue(),
    });
  }
}
