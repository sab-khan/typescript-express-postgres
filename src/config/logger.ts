import winston from 'winston';
import { ILogLevels, ILogColors } from 'types/interfaces';
import { appConfig } from './app';

const levels: ILogLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = appConfig.nodeEnv;
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors: ILogColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`),
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize({ all: true }), format),
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
