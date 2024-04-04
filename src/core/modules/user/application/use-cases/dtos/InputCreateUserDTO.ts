import { z } from 'zod';

import { IHashProvider } from '../../../infra/interfaces/hashProvider';
import { CreateUserException } from '../../exceptions/create-user.exception';
import { InputCreateUser } from '../create-user';

export class InputCreateUserDTO {
  public readonly name: string;
  public readonly email: string;
  private readonly password: string;

  constructor(
    props: InputCreateUser,
    private readonly hashProvider: IHashProvider,
  ) {
    const passwordValidation = this.validatePasswordSchema().safeParse(
      props.password,
    );

    if (passwordValidation.success === false) {
      throw CreateUserException.InputValidationFailed(
        `[password]:${passwordValidation.error.errors[0].message}`,
      );
    }

    const emailValidation = this.validateEmailSchema().safeParse(props.email);

    if (emailValidation.success === false) {
      throw CreateUserException.InputValidationFailed(
        `[email]:${emailValidation.error.errors[0].message}`,
      );
    }

    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  public async getPasswordHash(): Promise<string> {
    return this.hashProvider.hash(this.password);
  }

  private validateEmailSchema() {
    return z.string().email('Invalid email');
  }

  private validatePasswordSchema() {
    return z
      .string()
      .min(6, 'Password must have at least 6 characters')
      .regex(/[a-zA-Z].*[a-zA-Z]/, 'Password must have at least two letters')
      .regex(/[A-Z]/, 'Password must have at least one uppercase letter')
      .regex(/[!@#$%^&*]/, 'Password must have at least one special character');
  }
}
