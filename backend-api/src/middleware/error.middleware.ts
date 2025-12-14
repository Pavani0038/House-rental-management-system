import { Request, Response, NextFunction } from 'express';
import { ResponseUtil } from '../utils/response.util';

export class ErrorMiddleware {
  static notFound(req: Request, res: Response, _next: NextFunction): void {
    ResponseUtil.notFound(res, `Route ${req.originalUrl} not found`);
  }

  static handleError(error: Error, _req: Request, res: Response, next: NextFunction): void {
    console.error('Error:', error);

    if (res.headersSent) {
      return next(error);
    }

    ResponseUtil.serverError(res, 'An unexpected error occurred');
  }
}
