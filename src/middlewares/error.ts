import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { appConfig } from '@config/app';
import ApiError from '@common/utils/api-error';
import logger from '@config/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  if (err instanceof ApiError && err.statusCode) {
    statusCode = err.statusCode;
  }

  // Assign error message to res object to be used
  // by other middlewares or the route handler.
  res.locals.errorMessage = err.message;

  if (appConfig.nodeEnv === 'development') {
    logger.error(err);
  }

  // Handle the error response
  res.status(statusCode).json({
    error: appConfig.nodeEnv === 'production' ? 'Internal Server Error' : err.message,
    ...(appConfig.nodeEnv !== 'production' && { stack: err.stack }),
  });
};

export default errorMiddleware;
