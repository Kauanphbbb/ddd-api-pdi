import { compare, hash } from 'bcryptjs';

import { IHashPassword } from '@domain/user/services/HashPassword';

export class BcryptHashPass implements IHashPassword {
  public async hash(password: string): Promise<string> {
    return await hash(password, 10);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
