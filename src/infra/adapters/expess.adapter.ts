import express, { Express } from 'express';

import { IHttpServer } from '@/core/shared/IHttpServer';

type Methods =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head';

export class ExpressAdapter implements IHttpServer {
  private readonly app: Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  async registerRoute(
    method: Methods,
    path: string,
    handler: FunctionConstructor,
  ): Promise<void> {
    this.app[method](path, async function (req, res) {
      const output = await handler(req.params as unknown as string, req.body);

      res.status((output as unknown as { code: number }).code).json(output);
    });
  }

  async listen(port: number): Promise<void> {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
