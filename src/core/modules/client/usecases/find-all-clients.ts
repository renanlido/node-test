import {
  Client,
  Company,
  Contact,
  Output,
  Response,
} from './types/find-all-clients.types';

import { IHttpClient } from '@/core/shared/IHttpClient';

export class FindAllClientsUseCase {
  constructor(private readonly httpAdapter: IHttpClient) {}

  public async execute() {
    const companies = await this.httpAdapter.get<Response<Company[]>>(
      'https://fakerapi.it/api/v1/companies?_quantity=20',
    );

    const clients: Client[] = [];

    for await (const company of companies.data) {
      const perasons = await this.httpAdapter.get<Response<Contact[]>>(
        'https://fakerapi.it/api/v1/persons?_quantity=1',
      );

      const person = perasons.data[0];
      const fullName = `${person.firstname} ${person.lastname}`;

      clients.push({
        name: company.name,
        email: company.email,
        phone: company.phone,
        person: {
          fullName,
        },
      });
    }

    const output: Output = {
      total: companies.total,
      client: clients,
    };

    return output;
  }
}
