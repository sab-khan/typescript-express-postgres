import { Request, Response, NextFunction } from 'express';
import xss from 'xss';

const xssSanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) return next();

  for (const [key, value] of Object.entries(req.body)) {
    req.body[key] = xss(<string>value);
  }

  next();
};

export default xssSanitizeMiddleware;
