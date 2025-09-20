// src/domain/user/entities/User.ts
import { Email } from "../value-objects/Email";
import { Password } from "../value-objects/Password";

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: Email,
    public readonly password: Password,
  ) {}
}
