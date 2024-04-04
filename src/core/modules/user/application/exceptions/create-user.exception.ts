import { ErrorCodes } from '@/core/shared/constants/error-codes';
import { DefaultException } from '@/core/shared/exceptions/default.exceptions';

export class CreateUserException extends DefaultException {
  private constructor(message: string, code: ErrorCodes) {
    super('CreateUserException', message, code);
  }

  public static userAlreadyExists() {
    return new CreateUserException('User already exists', ErrorCodes.CONFLICT);
  }

  public static InputValidationFailed(message: string) {
    return new CreateUserException(message, ErrorCodes.INVALID_INPUT);
  }
}
