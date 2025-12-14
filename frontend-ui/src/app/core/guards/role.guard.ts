import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/auth.model';

/**
 * Factory function to create role-based guards
 * @param allowedRoles Array of roles allowed to access the route
 */
export function roleGuard(...allowedRoles: UserRole[]): CanActivateFn {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // Check if user has required role
    if (authService.hasAnyRole(allowedRoles)) {
      return true;
    }

    // User doesn't have required role - redirect to unauthorized page
    router.navigate(['/unauthorized']);
    return false;
  };
}

/**
 * Guard for Admin-only routes
 */
export const adminGuard: CanActivateFn = roleGuard(UserRole.ADMIN);

/**
 * Guard for Owner-only routes
 */
export const ownerGuard: CanActivateFn = roleGuard(UserRole.OWNER);

/**
 * Guard for Tenant-only routes
 */
export const tenantGuard: CanActivateFn = roleGuard(UserRole.TENANT);

/**
 * Guard for Owner and Admin routes
 */
export const ownerOrAdminGuard: CanActivateFn = roleGuard(UserRole.OWNER, UserRole.ADMIN);

/**
 * Guard for Tenant and Admin routes
 */
export const tenantOrAdminGuard: CanActivateFn = roleGuard(UserRole.TENANT, UserRole.ADMIN);
