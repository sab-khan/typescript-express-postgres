import { NextFunction } from 'express';
import httpMocks from 'node-mocks-http';
import xssSanitize from '@middlewares/xss-sanitize.middleware';

describe('XSS Sanitize Middleware', () => {
  test('should return next if request body is undefined', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    xssSanitize(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should return next if request body is empty', () => {
    const req = httpMocks.createRequest({
      body: {},
    });
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    xssSanitize(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should sanitize the request body', () => {
    const req = httpMocks.createRequest({
      body: {
        name: '<script>alert("XSS Attack")</script>',
      },
    });
    const res = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    xssSanitize(req, res, next);

    expect(req.body).toEqual({ name: '&lt;script&gt;alert("XSS Attack")&lt;/script&gt;' });
  });
});
