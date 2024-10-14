import winston from 'winston';
import { LogLevels, LogColors } from '@interfaces/logger.interface';
import { appConfig } from '@config/main.config';

const { combine, timestamp, printf, colorize, uncolorize, errors } = winston.format;

const levels: LogLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors: LogColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`),
);

const errorStackFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  errors({ stack: true }),
  printf(({ timestamp, level, message, stack }) => `${timestamp} ${level}: ${stack || message}`),
);

const transports = [
  new winston.transports.Console({
    format: combine(colorize(), errorStackFormat),
  }),
  new winston.transports.File({
    filename: 'logs/all.log',
    level: 'info',
    format: combine(uncolorize(), format),
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: combine(uncolorize(), errorStackFormat),
  }),
];

const logger = winston.createLogger({
  level: appConfig.nodeEnv === 'development' ? 'debug' : 'info',
  levels,
  format: errorStackFormat,
  transports,
});

export default logger;
