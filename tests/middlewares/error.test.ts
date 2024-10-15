import { NextFunction } from 'express';
import httpMocks from 'node-mocks-http';
import { StatusCodes } from 'http-status-codes';
import errorHandler from '@middlewares/error.middleware';
import ApiError from '@utils/api-error';
import logger from '@config/logger.config';
import { appConfig } from '@config/main.config';

describe('Error Middleware', () => {
  beforeEach(() => {
    jest.spyOn(logger, 'error').mockImplementation(jest.fn());
  });

  test('should send proper error response', () => {
    const error = new ApiError(StatusCodes.BAD_REQUEST, 'test error');
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();
    const spyOnSend = jest.spyOn(res, 'send');

    errorHandler(error, req, res, next);

    expect(spyOnSend).toHaveBeenCalledWith(expect.objectContaining({ code: error.statusCode, message: error.message }));
    expect(res.locals.errorMessage).toBe(error.message);
  });

  test('should supress error reporting in production', () => {
    const error = new ApiError(StatusCodes.BAD_REQUEST, 'test error');
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();
    const spyOnSend = jest.spyOn(res, 'send');

    appConfig.nodeEnv = 'production';

    errorHandler(error, req, res, next);

    expect(spyOnSend).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 500,
        message: 'Internal Server Error',
      }),
    );

    appConfig.nodeEnv = process.env.NODE_ENV;
  });

  test('should properly put the error message in res.locals', () => {
    const error = new ApiError(StatusCodes.BAD_REQUEST, 'test error');
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    errorHandler(error, req, res, next);

    expect(res.locals.errorMessage).toBe(error.message);
  });

  test('should log the error in development', () => {
    const error = new ApiError(StatusCodes.BAD_REQUEST, 'test error');
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    appConfig.nodeEnv = 'development';

    errorHandler(error, req, res, next);

    expect(logger.error).toHaveBeenCalled();

    appConfig.nodeEnv = process.env.NODE_ENV;
  });

  test('should include error stack in response in development', () => {
    const error = new ApiError(StatusCodes.BAD_REQUEST, 'test error');
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();
    const spyOnSend = jest.spyOn(res, 'send');

    appConfig.nodeEnv = 'development';

    errorHandler(error, req, res, next);

    expect(spyOnSend).toHaveBeenCalledWith(
      expect.objectContaining({
        code: error.statusCode,
        message: error.message,
        stack: error.stack,
      }),
    );

    appConfig.nodeEnv = process.env.NODE_ENV;
  });
});
