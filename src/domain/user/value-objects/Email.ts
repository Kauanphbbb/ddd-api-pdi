import { DomainError } from '@shared/errors/DomainError';

export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      throw new DomainError('E-mail inválido.');
    }

    return new Email(email.toLowerCase());
  }

  public getValue(): string {
    return this.value;
  }
}
