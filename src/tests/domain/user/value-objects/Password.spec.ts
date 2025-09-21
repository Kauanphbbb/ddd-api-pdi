import { DomainError } from '@shared/errors/DomainError';

import { Password } from '@domain/user/value-objects/Password';

describe('Password Value Object', () => {
  it('deve criar uma senha válida', () => {
    const password = Password.create('abc123!');
    expect(password.getValue()).toBe('abc123!');
  });

  it('deve lançar erro se a senha tiver menos de 6 caracteres', () => {
    expect(() => Password.create('a1!')).toThrow(DomainError);
    expect(() => Password.create('a1!')).toThrow(
      'Senha deve ter pelo menos 6 caracteres.',
    );
  });

  it('deve lançar erro se a senha não tiver número', () => {
    expect(() => Password.create('abcdef!')).toThrow(DomainError);
    expect(() => Password.create('abcdef!')).toThrow(
      'Senha deve conter pelo menos 1 número.',
    );
  });

  it('deve lançar erro se a senha não tiver caractere especial', () => {
    expect(() => Password.create('abcdef1')).toThrow(DomainError);
    expect(() => Password.create('abcdef1')).toThrow(
      'Senha deve conter pelo menos 1 caractere especial.',
    );
  });
});
