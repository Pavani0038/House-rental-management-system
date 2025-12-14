import { Routes } from '@angular/router';
import { LandingComponent } from './features/public/landing.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { UnauthorizedComponent } from './features/shared/unauthorized.component';
import { TenantDashboardComponent } from './features/tenant/tenant-dashboard.component';
import { OwnerDashboardComponent } from './features/owner/owner-dashboard.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { tenantGuard, ownerGuard, adminGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Public routes
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },

  // Tenant routes - Protected by tenant guard
  {
    path: 'tenant',
    canActivate: [tenantGuard],
    children: [
      { path: '', redirectTo: 'properties', pathMatch: 'full' },
      { path: 'properties', component: TenantDashboardComponent },
      { path: 'bookings', component: TenantDashboardComponent },
      { path: 'profile', component: TenantDashboardComponent }
    ]
  },

  // Owner routes - Protected by owner guard
  {
    path: 'owner',
    canActivate: [ownerGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: OwnerDashboardComponent },
      { path: 'properties', component: OwnerDashboardComponent },
      { path: 'properties/add', component: OwnerDashboardComponent },
      { path: 'bookings', component: OwnerDashboardComponent },
      { path: 'revenue', component: OwnerDashboardComponent }
    ]
  },

  // Admin routes - Protected by admin guard
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: AdminDashboardComponent },
      { path: 'properties', component: AdminDashboardComponent },
      { path: 'analytics', component: AdminDashboardComponent },
      { path: 'settings', component: AdminDashboardComponent }
    ]
  },

  // Fallback route
  { path: '**', redirectTo: '/login' }
];
