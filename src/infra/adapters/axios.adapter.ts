import axios, { AxiosInstance } from 'axios';

import { IHttpClient } from '../../core/shared/IHttpClient';

export class AxiosAdapter implements IHttpClient {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.axios.get<T>(url);

    return response.data;
  }
}
