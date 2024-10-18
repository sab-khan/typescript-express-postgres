// Load .env file to fix the following issue https://github.com/typeorm/typeorm/issues/3894
import 'dotenv/config';

import { DataSource } from 'typeorm';
import { dbConfig } from './src/config/app.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.name,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/src/entities/*.ts`],
  migrations: [`${__dirname}/database/migrations/*.ts`],
  subscribers: [],
  migrationsTableName: 'migrations',
});
