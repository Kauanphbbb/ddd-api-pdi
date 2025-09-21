import { randomUUID } from 'crypto';
import { User } from '../../../domain/user/entities/User';
import { type IUserRepository } from '../../../domain/user/repositories/IUserRepository';
import { Email } from '../../../domain/user/value-objects/Email';
import { Id } from '../../../domain/user/value-objects/Id';
import { Password } from '../../../domain/user/value-objects/Password';
import { DomainError } from '../../../shared/errors/DomainError';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const email = Email.create(data.email);

    const password = Password.create(data.password);

    const id = Id.create(randomUUID());

    const exists = await this.userRepository.findByEmail(email.getValue());

    if (exists) throw new DomainError('E-mail já cadastrado.');

    const user = new User(id, data.name, email, password);

    await this.userRepository.save(user);

    return user;
  }
}
