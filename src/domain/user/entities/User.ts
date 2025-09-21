import { Email } from '../value-objects/Email';
import { Id } from '../value-objects/Id';
import { Password } from '../value-objects/Password';

export class User {
  constructor(
    public readonly id: Id,
    public readonly name: string,
    public readonly email: Email,
    public readonly password: Password
  ) {}
}
