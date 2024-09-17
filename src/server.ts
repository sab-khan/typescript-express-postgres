import * as dotenv from 'dotenv';

import express from 'express';
import helmet from 'helmet';
import morgan from './config/morgan';
import { appConfig } from './config/app';

dotenv.config();

const app = express();

// Set trust proxy only if you are behind a proxy.
// this is to make sure that the client headers are not open
// for a security breach on a server without a proxy.
if (appConfig.reverseProxy === 'true') {
  app.set('trust proxy', true);
}

if (appConfig.nodeEnv !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// security headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(appConfig.port, () => {
  console.log(`Server running on http://localhost:${appConfig.port}`);
});

export default app;
