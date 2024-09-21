import { Request, Response } from 'express';
import morgan, { StreamOptions } from 'morgan';
import Logger from '@config/logger';
import { appConfig } from '@config/app';

const getIpFormat = (): string => (appConfig.nodeEnv === 'production' ? ':remote-addr ' : '');

const successResFormat = `${getIpFormat()}:method :url :status :res[content-length] - :response-time ms`;
const errorResFormat = `${getIpFormat()}:remote-addr :method :url :status :res[content-length] - :response-time ms`;

const successHandler = morgan(successResFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message): StreamOptions => Logger.info(message.trim()) },
});

const errorHandler = morgan(errorResFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message): StreamOptions => Logger.error(message.trim()) },
});

export default { successHandler, errorHandler };
