import { Email } from '@domain/user/value-objects/Email';
import { Id } from '@domain/user/value-objects/Id';
import { Password } from '@domain/user/value-objects/Password';

export class User {
  constructor(
    public readonly id: Id,
    public readonly name: string,
    public readonly email: Email,
    public readonly password: Password,
  ) {}
}
