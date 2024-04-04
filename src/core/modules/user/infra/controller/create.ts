import { CreateUserUseCase } from '../../application/use-cases/create-user';
import { InputCreateUserDTO } from '../../application/use-cases/dtos/InputCreateUserDTO';
import { IHashProvider } from '../interfaces/hashProvider';

import { ErrorCodes } from '@/core/shared/constants/error-codes';
import { DefaultException } from '@/core/shared/exceptions/default.exceptions';
import { IHttpServer } from '@/core/shared/IHttpServer';

type Body = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserController {
  private constructor(
    readonly httpServer: IHttpServer,
    readonly createUserUseCase: CreateUserUseCase,
    readonly hashProvider: IHashProvider,
  ) {
    httpServer.registerRoute(
      'post',
      '/users',
      async function (_: unknown, body: Body) {
        try {
          const input = new InputCreateUserDTO(body, hashProvider);

          await createUserUseCase.execute(input);

          return { message: 'User created successfully', code: 204 };
        } catch (error) {
          if (error instanceof DefaultException) {
            return {
              message: error.message,
              code: error.code,
              name: error.name,
            };
          }

          const err = error as Error;

          return {
            message: err.message,
            code: ErrorCodes.INTERNAL_SERVER_ERROR,
          };
        }
      },
    );
  }

  public static async create(
    httpServer: IHttpServer,
    createUserUseCase: CreateUserUseCase,
    hashProvider: IHashProvider,
  ) {
    return new CreateUserController(
      httpServer,
      createUserUseCase,
      hashProvider,
    );
  }
}
