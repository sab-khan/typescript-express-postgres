import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { appConfig } from '@config/main.config';
import ApiError from '@utils/api-error';
import logger from '@config/logger.config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  let statusCode;

  if (err instanceof ApiError && err.statusCode) {
    statusCode = err.statusCode;
  } else {
    statusCode = StatusCodes.BAD_REQUEST;
  }

  // suppress the errors in production
  if (appConfig.nodeEnv === 'production') {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    err.message = 'Internal Server Error';
  }

  // Assign error message to res object to be used
  // by other middlewares or the route handler.
  res.locals.errorMessage = err.message;

  if (appConfig.nodeEnv === 'development') {
    logger.error(err);
  }

  // Handle the error response
  res.status(statusCode).send({
    code: statusCode,
    message: err.message,
    ...(appConfig.nodeEnv !== 'production' && { stack: err.stack }),
  });
};

export default errorMiddleware;
