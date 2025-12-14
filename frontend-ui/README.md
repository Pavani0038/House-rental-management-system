# Frontend UI - Property Rental System

Industrial-grade Angular application with role-based access control.

## Project Structure

```
src/
├── app/
│   ├── core/              # Core module (services, guards, interceptors)
│   │   ├── guards/        # Route guards (auth, role-based)
│   │   ├── interceptors/  # HTTP interceptors
│   │   ├── models/        # TypeScript interfaces and enums
│   │   └── services/      # Core services (auth, etc.)
│   ├── features/          # Feature modules
│   │   ├── admin/         # Admin dashboard and components
│   │   ├── auth/          # Login and register components
│   │   ├── owner/         # Owner dashboard and components
│   │   ├── tenant/        # Tenant dashboard and components
│   │   └── shared/        # Shared components
│   ├── app.component.*    # Root component
│   ├── app.config.ts      # App configuration
│   └── app.routes.ts      # Application routes
└── environments/          # Environment configurations
```

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Owner, Tenant)
- Route guards for protected routes
- HTTP interceptors for automatic token injection

### User Roles
- **Admin** - Full system access (user management, analytics, settings)
- **Owner** - Property management, booking requests, revenue tracking
- **Tenant** - Browse properties, booking requests, profile management

### Security Features
- Protected routes with role-based guards
- Automatic redirection for unauthorized access
- Token expiration handling
- Secure password validation

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd frontend-ui
   npm install
   ```

2. **Configure environment:**
   Update `src/environments/environment.ts` with your backend API URL

3. **Run development server:**
   ```bash
   npm start
   ```

4. **Access the application:**
   Open browser to `http://localhost:4200`

## Routes & Guards

### Public Routes
- `/login` - User login
- `/register` - User registration
- `/unauthorized` - Access denied page

### Tenant Routes (Protected by tenantGuard)
- `/tenant/properties` - Browse available properties
- `/tenant/bookings` - View booking requests
- `/tenant/profile` - User profile

### Owner Routes (Protected by ownerGuard)
- `/owner/dashboard` - Owner dashboard
- `/owner/properties` - Manage properties
- `/owner/bookings` - Manage booking requests

### Admin Routes (Protected by adminGuard)
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - User management
- `/admin/properties` - All properties
- `/admin/analytics` - System analytics

## Technologies
- Angular 18+ (Standalone Components)
- TypeScript
- RxJS
- SCSS
- Angular Router with Guards
- HTTP Client with Interceptors

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
