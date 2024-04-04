import { IUserRepository } from '../../domain/repository/user.repository';

interface Output {
  name: string;
  email: string;
}

export class FindAllUsersUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(): Promise<Output[]> {
    const users = await this.repository.getAll();

    const output: Output[] = [];

    for (const user of users) {
      output.push({
        name: user.name,
        email: user.email,
      });
    }

    return output;
  }
}
