import bcrypt from 'bcrypt';

import { IHashProvider } from '@/core/modules/user/infra/interfaces/hashProvider';

export class BcryptAdapter implements IHashProvider {
  private readonly instance: typeof bcrypt;
  private readonly salts = 10;

  constructor() {
    this.instance = bcrypt;
  }

  hash(payload: string): Promise<string> {
    return this.instance.hash(payload, this.salts);
  }

  compare(payload: string, hashed: string): Promise<boolean> {
    return this.instance.compare(payload, hashed);
  }
}
