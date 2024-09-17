import morgan, { StreamOptions } from 'morgan';
import Logger from './logger';

const format = `:remote-addr :method :url :status :res[content-length] - :response-time ms`;

const successHandler = morgan(format, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message): StreamOptions => Logger.info(message.trim()) },
});

const errorHandler = morgan(format, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message): StreamOptions => Logger.error(message.trim()) },
});

export default { successHandler, errorHandler };
