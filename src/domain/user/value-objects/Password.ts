import { DomainError } from '@shared/errors/DomainError';

export class Password {
  private constructor(private readonly value: string) {}

  public static create(password: string): Password {
    if (password.length < 6) {
      throw new DomainError('Senha deve ter pelo menos 6 caracteres.');
    }

    if (!/[0-9]/.test(password)) {
      throw new DomainError('Senha deve conter pelo menos 1 número.');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new DomainError(
        'Senha deve conter pelo menos 1 caractere especial.',
      );
    }

    return new Password(password);
  }

  public static createFromHash(hash: string): Password {
    return new Password(hash);
  }

  public getValue(): string {
    return this.value;
  }
}
