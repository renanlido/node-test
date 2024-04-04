import { ErrorCodes } from '../constants/error-codes';

export abstract class DefaultException extends Error {
  constructor(
    name: string,
    message: string,
    public readonly code: ErrorCodes,
  ) {
    super(message);
    this.name = name;
  }
}
