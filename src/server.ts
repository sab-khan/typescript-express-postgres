import * as dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from '@config/morgan';
import { appConfig } from '@config/app';
import errorMiddleware from '@middlewares/error';
import ApiError from '@common/utils/api-error';

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
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(503, 'An error occurred!');
  next(error);
  //res.status(200).json({ message: 'Hello World!' });
});

// error handler
app.use(errorMiddleware);

app.listen(appConfig.port, () => {
  console.log(`Server running on http://localhost:${appConfig.port}`);
});

export default app;
