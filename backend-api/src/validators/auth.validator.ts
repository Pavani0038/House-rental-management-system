import { LoginRequest, RegisterRequest, UserRole } from '../types';

export class AuthValidator {
  static validateEmail(email: string): { valid: boolean; error?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return { valid: false, error: 'Email is required' };
    }
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Invalid email format' };
    }
    return { valid: true };
  }

  static validateLoginRequest(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.email) {
      errors.push('Email is required');
    } else {
      const emailValidation = this.validateEmail(data.email);
      if (!emailValidation.valid) {
        errors.push(emailValidation.error!);
      }
    }

    if (!data.password) {
      errors.push('Password is required');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  static validateRegisterRequest(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Email validation
    if (!data.email) {
      errors.push('Email is required');
    } else {
      const emailValidation = this.validateEmail(data.email);
      if (!emailValidation.valid) {
        errors.push(emailValidation.error!);
      }
    }

    // Password validation
    if (!data.password) {
      errors.push('Password is required');
    } else if (data.password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    // Name validation
    if (!data.firstName || data.firstName.trim().length === 0) {
      errors.push('First name is required');
    }
    if (!data.lastName || data.lastName.trim().length === 0) {
      errors.push('Last name is required');
    }

    // Role validation
    if (!data.role) {
      errors.push('Role is required');
    } else if (!Object.values(UserRole).includes(data.role)) {
      errors.push('Invalid role. Must be admin, owner, or tenant');
    }

    // Phone number validation (optional)
    if (data.phoneNumber) {
      const phoneRegex = /^\+?[\d\s-()]+$/;
      if (!phoneRegex.test(data.phoneNumber)) {
        errors.push('Invalid phone number format');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
