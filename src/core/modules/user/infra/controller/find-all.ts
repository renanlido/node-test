import { FindAllUsersUseCase } from '../../application/use-cases/find-all-user';

import { ErrorCodes } from '@/core/shared/constants/error-codes';
import { DefaultException } from '@/core/shared/exceptions/default.exceptions';
import { IHttpServer } from '@/core/shared/IHttpServer';

export class FindAllUserController {
  private constructor(
    readonly httpServer: IHttpServer,
    readonly useCase: FindAllUsersUseCase,
  ) {
    httpServer.registerRoute('get', '/users', async function () {
      try {
        const response = await useCase.execute();

        return { data: response, code: 200 };
      } catch (error) {
        if (error instanceof DefaultException) {
          return { message: error.message, code: error.code, name: error.name };
        }

        const err = error as Error;

        return { message: err.message, code: ErrorCodes.INTERNAL_SERVER_ERROR };
      }
    });
  }

  public static async create(
    httpServer: IHttpServer,
    useCase: FindAllUsersUseCase,
  ) {
    return new FindAllUserController(httpServer, useCase);
  }
}
