import { AppConfig } from '@interfaces/app.interface';

export const appConfig: AppConfig = {
  name: process.env.APP_NAME || 'Typescript Express Postgres REST API',
  port: Number(process.env.APP_PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  reverseProxy: process.env.REVERSE_PROXY || 'false',
};

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  name: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};
