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
  migrations: [`${__dirname}/db/migrations/*.ts`],
  subscribers: [],
});
