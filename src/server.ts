import * as dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from '@config/morgan.config';
import { appConfig } from '@config/main.config';
import errorHandler from '@middlewares/error.middleware';
import xssSanitize from '@middlewares/xss-sanitize.middleware';
import ApiError from '@utils/api-error';

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
  const error = new ApiError(503, 'An error occurred!');
  next(error);
  //res.status(200).json({ message: 'Hello World!' });
});

// error handler
app.use(errorHandler);

app.listen(appConfig.port, () => {
  console.log(`Server running on http://localhost:${appConfig.port}`);
});

export default app;
