import morgan, { StreamOptions } from 'morgan';
import logger from '@config/logger';
import { appConfig } from '@config/config';

const format =
  appConfig.nodeEnv === 'production'
    ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'
    : ':method :url :status :response-time ms - :res[content-length]';

const httpResponseHandler = morgan(format, {
  stream: { write: (message): StreamOptions => logger.info(message.trim()) },
});

export default { httpResponseHandler };
