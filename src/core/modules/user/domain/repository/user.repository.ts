import { User } from '../entities/user';

export interface IUserRepository {
  save(user: User): Promise<void>;
  getOne(id: string): Promise<User | undefined>;
  getAll(): Promise<User[]>;
  getOneByEmail(email: string): Promise<User | undefined>;
}
