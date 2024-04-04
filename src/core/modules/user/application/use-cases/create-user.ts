import { User } from '../../domain/entities/user';
import { IUserRepository } from '../../domain/repository/user.repository';
import { CreateUserException } from '../exceptions/create-user.exception';

import { InputCreateUserDTO } from './dtos/InputCreateUserDTO';

export interface InputCreateUser {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(data: InputCreateUserDTO): Promise<void> {
    const findedUser = await this.repository.getOneByEmail(data.email);

    if (findedUser) {
      throw CreateUserException.userAlreadyExists();
    }

    const password = await data.getPasswordHash();

    const user = User.create({ ...data, password });

    await this.repository.save(user);
  }
}
