import { Id } from '@domain/user/value-objects/Id';
import { DomainError } from '@shared/errors/DomainError';

describe('Id Value Object', () => {
  it('deve criar um Id válido com prefixo "usr_"', () => {
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    const id = Id.create(uuid);
    expect(id.getValue()).toBe(`usr_${uuid}`);
  });

  it('deve lançar erro se o UUID for inválido (formato errado)', () => {
    const invalidUuid = '123456';
    expect(() => Id.create(invalidUuid)).toThrow(DomainError);
    expect(() => Id.create(invalidUuid)).toThrow('UUID inválido');
  });

  it('deve lançar erro se o UUID tiver caracteres inválidos', () => {
    const invalidUuid = 'zzze4567-e89b-12d3-a456-426614174000';
    expect(() => Id.create(invalidUuid)).toThrow(DomainError);
    expect(() => Id.create(invalidUuid)).toThrow('UUID inválido');
  });

  it('deve aceitar UUIDs maiúsculos e normalizar corretamente', () => {
    const uuid = '123E4567-E89B-12D3-A456-426614174000';
    const id = Id.create(uuid);
    expect(id.getValue()).toBe(`usr_${uuid}`);
  });
});
