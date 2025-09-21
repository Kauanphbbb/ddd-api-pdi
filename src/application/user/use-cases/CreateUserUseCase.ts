import { randomUUID } from 'crypto';

import { DomainError } from '@shared/errors/DomainError';

import { User } from '@domain/user/entities/User';
import { IUserRepository } from '@domain/user/repositories/IUserRepository';
import { IHashPassword } from '@domain/user/services/HashPassword';
import { Email } from '@domain/user/value-objects/Email';
import { Id } from '@domain/user/value-objects/Id';
import { Password } from '@domain/user/value-objects/Password';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  public constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHashProvider: IHashPassword,
  ) {}

  public async execute(data: CreateUserDTO): Promise<User> {
    const email = Email.create(data.email);

    const password = Password.create(data.password);

    const hash = await this.passwordHashProvider.hash(password.getValue());

    const hashedPassword = Password.createFromHash(hash);

    const id = Id.create(randomUUID());

    const exists = await this.userRepository.findByEmail(email.getValue());

    if (exists) throw new DomainError('E-mail já cadastrado.');

    const user = new User(id, data.name, email, hashedPassword);

    await this.userRepository.save(user);

    return user;
  }
}
