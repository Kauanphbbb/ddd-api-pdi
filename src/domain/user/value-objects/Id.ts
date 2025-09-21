import { DomainError } from '@shared/errors/DomainError';

export class Id {
  private constructor(private readonly value: string) {}

  public static create(uuid: string): Id {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        uuid,
      );

    if (!isUuid) {
      throw new DomainError('UUID inválido');
    }

    const userId = `usr_${uuid}`;

    return new Id(userId);
  }

  public getValue(): string {
    return this.value;
  }
}
