import * as dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from '@config/morgan.config';
import { appConfig } from '@config/app.config';
import errorHandler from '@middlewares/error.middleware';
import xssSanitize from '@middlewares/xss-sanitize.middleware';
import { AppDataSource } from '../ormconfig';
import { User } from '@entitiesuser.entity';

const app = express();

// Set trust proxy only if you are behind a proxy.
// this is to make sure that the client headers are not open
// for a security breach on a server without a proxy.
if (appConfig.reverseProxy === 'true') {
  app.set('trust proxy', true);
}

if (appConfig.nodeEnv !== 'test') {
  app.use(morgan.httpResponseHandler);
}

// security headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: '100kb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// sanitize request body data
app.use(xssSanitize);

// enable cors
app.use(cors());
app.options('*', cors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();
  res.status(200).send(users);
});

// error handler
app.use(errorHandler);

export default app;
