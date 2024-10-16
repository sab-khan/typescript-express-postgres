import app from './server';
import { AppDataSource } from '../ormconfig';
import { appConfig } from '@config/app.config';
import logger from '@config/logger.config';

const initApp = async () => {
  // initialize database connection
  try {
    await AppDataSource.initialize();
    logger.info('Connected to PostgreSQL with TypeORM');

    // Start the server only after the database connection is established
    app.listen(appConfig.port, () => {
      logger.info(`Server running on port ${appConfig.port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

// log uncaught exception and exit
process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

// boostrap the application
initApp();
