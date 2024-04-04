/* eslint-disable @typescript-eslint/ban-types */
export interface IHttpServer {
  registerRoute(method: string, path: string, handler: Function): Promise<void>;
  listen(port: number): Promise<void>;
}
