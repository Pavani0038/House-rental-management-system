import { Response } from 'express';
import { ApiResponse } from '../types';

export class ResponseUtil {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data
    };
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message: string,
    errors?: any[],
    statusCode: number = 400
  ): Response {
    const response: ApiResponse = {
      success: false,
      message,
      errors
    };
    return res.status(statusCode).json(response);
  }

  static unauthorized(res: Response, message: string = 'Unauthorized'): Response {
    return this.error(res, message, undefined, 401);
  }

  static forbidden(res: Response, message: string = 'Forbidden'): Response {
    return this.error(res, message, undefined, 403);
  }

  static notFound(res: Response, message: string = 'Resource not found'): Response {
    return this.error(res, message, undefined, 404);
  }

  static serverError(res: Response, message: string = 'Internal server error'): Response {
    return this.error(res, message, undefined, 500);
  }
}
