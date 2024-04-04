/* eslint-disable @typescript-eslint/no-explicit-any */

import { FindAllClientsUseCase } from '../../usecases/find-all-clients';

import { FindAllCLientsController } from './find-all';

import { IHttpServer } from '@/core/shared/IHttpServer';
import { AxiosAdapter } from '@/infra/adapters/axios.adapter';

export class ClientController {
  private readonly controllers: string[];
  private methods: string[] = [];
  private controllerName: string = 'clients';

  private constructor(private readonly app: IHttpServer) {
    this.controllers = Object.getOwnPropertyNames(
      this.constructor.prototype,
    ).filter(
      (method) =>
        method !== 'constructor' &&
        typeof this[method as keyof ClientController] === 'function',
    );
  }

  public static async create(app: IHttpServer) {
    const self = new ClientController(app);

    for await (const controller of self.controllers) {
      await (self as any)[controller]();
    }

    console.log(`controller: [${self.constructor.name}]`);
    console.log(`route: ['/${self.controllerName}']`);

    for (const method of self.methods) {
      console.log(`method: [${method}]`);
    }

    console.log('');

    return self;
  }

  private async findAllController() {
    this.methods.push('get');
    await FindAllCLientsController.create(
      this.app,
      new FindAllClientsUseCase(new AxiosAdapter()),
    );
  }
}
