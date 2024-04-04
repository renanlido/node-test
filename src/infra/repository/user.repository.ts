import { prisma } from '../db/prisma-client';

import { User } from '@/core/modules/user/domain/entities/user';
import { IUserRepository } from '@/core/modules/user/domain/repository/user.repository';

export class UserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    const output: User[] = [];

    for (const user of users) {
      output.push(new User(user.id, user.email, user.name, user.password));
    }

    return output;
  }

  async getOneByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return undefined;

    return new User(user.id, user.email, user.name, user.password);
  }

  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });
  }

  async getOne(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return undefined;

    return new User(user.id, user.email, user.name, user.password);
  }
}
