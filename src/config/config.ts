import { IAppConfig } from '../types/interfaces';

export const appConfig: IAppConfig = {
  name: process.env.APP_NAME || 'Typescript Express Postgres REST API',
  port: Number(process.env.APP_PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  reverseProxy: process.env.REVERSE_PROXY || 'false',
};