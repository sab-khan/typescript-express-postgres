import * as dotenv from 'dotenv';

import express from 'express';
import { appConfig } from './config/app';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(appConfig.port, () => {
  console.log(`Server running on http://localhost:${appConfig.port}`);
});

export default app;
