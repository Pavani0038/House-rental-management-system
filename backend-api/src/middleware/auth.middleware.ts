import { Response, NextFunction } from 'express';
import { JWTUtil } from '../utils/jwt.util';
import { ResponseUtil } from '../utils/response.util';
import { AuthenticatedRequest, UserRole } from '../types';

export class AuthMiddleware {
  static authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        ResponseUtil.unauthorized(res, 'No token provided');
        return;
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      const payload = JWTUtil.verifyToken(token);

      if (!payload) {
        ResponseUtil.unauthorized(res, 'Invalid or expired token');
        return;
      }

      req.user = payload;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      ResponseUtil.unauthorized(res, 'Authentication failed');
    }
  }

  static authorize(...allowedRoles: UserRole[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
      if (!req.user) {
        ResponseUtil.unauthorized(res, 'Authentication required');
        return;
      }

      if (!allowedRoles.includes(req.user.role)) {
        ResponseUtil.forbidden(res, 'You do not have permission to access this resource');
        return;
      }

      next();
    };
  }

  static optionalAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const payload = JWTUtil.verifyToken(token);
        if (payload) {
          req.user = payload;
        }
      }

      next();
    } catch (error) {
      // Continue without authentication
      next();
    }
  }
}
