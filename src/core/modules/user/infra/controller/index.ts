/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateUserUseCase } from '../../application/use-cases/create-user';
import { FindAllUsersUseCase } from '../../application/use-cases/find-all-user';
import { IUserRepository } from '../../domain/repository/user.repository';

import { CreateUserController } from './create';
import { FindAllUserController } from './find-all';

import { IHttpServer } from '@/core/shared/IHttpServer';
import { BcryptAdapter } from '@/infra/adapters/bcrypt.adapter';

export class UserController {
  private readonly controllers: string[];
  private methods: string[] = [];
  private controllerName: string = 'users';

  private constructor(private readonly app: IHttpServer) {
    this.controllers = Object.getOwnPropertyNames(
      this.constructor.prototype,
    ).filter(
      (method) =>
        method !== 'constructor' &&
        typeof this[method as keyof UserController] === 'function',
    );
  }

  public static async create(app: IHttpServer, repository: IUserRepository) {
    const self = new UserController(app);

    for await (const controller of self.controllers) {
      await (self as any)[controller](repository);
    }

    console.log(`controller: [${self.constructor.name}]`);
    console.log(`route: ['/${self.controllerName}']`);

    for (const method of self.methods) {
      console.log(`method: [${method}]`);
    }

    console.log('');
    return self;
  }

  private async createUserController(repository: IUserRepository) {
    this.methods.push('post');

    await CreateUserController.create(
      this.app,
      new CreateUserUseCase(repository),
      new BcryptAdapter(),
    );
  }

  private async findAllController(repository: IUserRepository) {
    this.methods.push('get');
    await FindAllUserController.create(
      this.app,
      new FindAllUsersUseCase(repository),
    );
  }
}
