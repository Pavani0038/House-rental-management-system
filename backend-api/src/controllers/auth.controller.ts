import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ResponseUtil } from '../utils/response.util';
import { LoginRequest, RegisterRequest, AuthenticatedRequest } from '../types';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const credentials: LoginRequest = req.body;
      const result = await AuthService.login(credentials);

      if (result.success) {
        ResponseUtil.success(res, result.message, result.data, 200);
      } else {
        ResponseUtil.error(res, result.message, undefined, 401);
      }
    } catch (error) {
      console.error('Login controller error:', error);
      ResponseUtil.serverError(res, 'Login failed');
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: RegisterRequest = req.body;
      const result = await AuthService.register(userData);

      if (result.success) {
        ResponseUtil.success(res, result.message, result.data, 201);
      } else {
        ResponseUtil.error(res, result.message, undefined, 400);
      }
    } catch (error) {
      console.error('Registration controller error:', error);
      ResponseUtil.serverError(res, 'Registration failed');
    }
  }

  static async getCurrentUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res);
        return;
      }

      ResponseUtil.success(res, 'User retrieved successfully', {
        userId: req.user.userId,
        email: req.user.email,
        role: req.user.role
      });
    } catch (error) {
      console.error('Get current user error:', error);
      ResponseUtil.serverError(res);
    }
  }

  static async verifyToken(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        ResponseUtil.unauthorized(res, 'Invalid token');
        return;
      }

      ResponseUtil.success(res, 'Token is valid', {
        valid: true,
        user: req.user
      });
    } catch (error) {
      console.error('Token verification error:', error);
      ResponseUtil.serverError(res);
    }
  }
}
