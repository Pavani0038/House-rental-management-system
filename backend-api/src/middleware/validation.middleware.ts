import { Request, Response, NextFunction } from 'express';
import { ResponseUtil } from '../utils/response.util';
import { AuthValidator } from '../validators/auth.validator';

export class ValidationMiddleware {
  static validateLogin(req: Request, res: Response, next: NextFunction): void {
    const validation = AuthValidator.validateLoginRequest(req.body);
    
    if (!validation.valid) {
      ResponseUtil.error(res, 'Validation failed', validation.errors, 400);
      return;
    }
    
    next();
  }

  static validateRegister(req: Request, res: Response, next: NextFunction): void {
    const validation = AuthValidator.validateRegisterRequest(req.body);
    
    if (!validation.valid) {
      ResponseUtil.error(res, 'Validation failed', validation.errors, 400);
      return;
    }
    
    next();
  }
}
