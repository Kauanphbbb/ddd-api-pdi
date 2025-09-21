import { Email } from '@domain/user/value-objects/Email';
import { DomainError } from '@shared/errors/DomainError';

describe('Email Value Object', () => {
  it('deve criar um email válido e converter para lowercase', () => {
    const email = Email.create('TEST@Example.com');
    expect(email.getValue()).toBe('test@example.com');
  });

  it('deve lançar erro se o email for inválido (sem @)', () => {
    expect(() => Email.create('invalidemail.com')).toThrow(DomainError);
    expect(() => Email.create('invalidemail.com')).toThrow('E-mail inválido.');
  });

  it('deve lançar erro se o email for inválido (sem domínio)', () => {
    expect(() => Email.create('user@')).toThrow(DomainError);
    expect(() => Email.create('user@')).toThrow('E-mail inválido.');
  });

  it('deve lançar erro se o email for inválido (espaços em branco)', () => {
    expect(() => Email.create('user @example.com')).toThrow(DomainError);
    expect(() => Email.create('user @example.com')).toThrow('E-mail inválido.');
  });

  it('deve criar email válido com subdomínio', () => {
    const email = Email.create('user@mail.example.co');
    expect(email.getValue()).toBe('user@mail.example.co');
  });
});
