import { User } from '@domain/user/entities/User';
import { IUserRepository } from '@domain/user/repositories/IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  public async save(user: User): Promise<void> {
    this.users.push(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email.getValue() === email) || null;
  }
}
