import { UserModel } from '../models/user.model';
import { PasswordUtil } from '../utils/password.util';
import { JWTUtil } from '../utils/jwt.util';
import { LoginRequest, RegisterRequest, AuthResponse, JWTPayload } from '../types';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Find user by email
      const user = await UserModel.findByEmail(credentials.email);
      
      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Check if user is active
      if (!user.isActive) {
        return {
          success: false,
          message: 'Account is inactive. Please contact support.'
        };
      }

      // Verify password
      const isPasswordValid = await PasswordUtil.compare(credentials.password, user.password);
      
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Generate JWT token
      const payload: JWTPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };
      
      const token = JWTUtil.generateToken(payload);

      // Return user data (without password) and token
      return {
        success: true,
        message: 'Login successful',
        data: {
          user: UserModel.toDTO(user),
          token
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login'
      };
    }
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await UserModel.findByEmail(userData.email);
      
      if (existingUser) {
        return {
          success: false,
          message: 'Email already registered'
        };
      }

      // Hash password
      const hashedPassword = await PasswordUtil.hash(userData.password);

      // Create user
      const user = await UserModel.create({
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        phoneNumber: userData.phoneNumber
      });

      // Generate JWT token
      const payload: JWTPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };
      
      const token = JWTUtil.generateToken(payload);

      return {
        success: true,
        message: 'Registration successful',
        data: {
          user: UserModel.toDTO(user),
          token
        }
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An error occurred during registration'
      };
    }
  }

  static async verifyToken(token: string): Promise<JWTPayload | null> {
    return JWTUtil.verifyToken(token);
  }
}
