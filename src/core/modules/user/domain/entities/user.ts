import { randomUUID } from 'crypto';

export interface IPasswordValidator {
  validate(password: string): void;
}

type UserProps = {
  name: string;
  email: string;
  password: string;
};

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  public static create(props: UserProps): User {
    return new User(randomUUID(), props.name, props.email, props.password);
  }
}
