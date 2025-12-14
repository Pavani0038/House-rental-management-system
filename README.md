# Property Rental System

Complete full-stack application with role-based authentication and authorization.

## Project Overview

This system provides a comprehensive property rental management platform with three distinct user roles:
- **Admin** - System administration, user management, and analytics
- **Owner** - Property management and booking oversight
- **Tenant** - Property browsing and booking requests

## Architecture

### Backend (Node.js + TypeScript + MySQL)
- RESTful API with Express.js
- JWT-based authentication
- Role-based access control
- MySQL database with connection pooling
- Industrial-grade folder structure

### Frontend (Angular + TypeScript)
- Standalone components architecture
- Route guards for role-based access
- HTTP interceptors for authentication
- Responsive UI with modern design

## Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MySQL credentials and JWT secret.

4. **Start the server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```
   Application runs on `http://localhost:4200`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/verify` - Verify token (protected)

## User Roles & Permissions

### Tenant
- Access: All tenant-related components
- Can: Browse properties, make booking requests, manage profile

### Owner
- Access: All owner-related components
- Can: Manage properties, review bookings, track revenue

### Admin
- Access: All admin components
- Can: Manage users, view analytics, configure system settings

## Security Features

### Backend
- Password hashing with bcrypt
- JWT token-based authentication
- Role-based authorization middleware
- Input validation
- SQL injection protection

### Frontend
- Route guards preventing unauthorized access
- Automatic token injection via interceptors
- Token expiration handling
- Secure storage of credentials

## Folder Structure

### Backend (`backend-api/`)
```
src/
├── config/          # Database and environment configuration
├── controllers/     # Request handlers
├── middleware/      # Auth, validation, error handling
├── models/          # Database models
├── routes/          # API route definitions
├── services/        # Business logic
├── types/           # TypeScript types
├── utils/           # Utility functions
├── validators/      # Input validators
└── server.ts        # Application entry point
```

### Frontend (`frontend-ui/`)
```
src/app/
├── core/
│   ├── guards/        # Route guards
│   ├── interceptors/  # HTTP interceptors
│   ├── models/        # TypeScript interfaces
│   └── services/      # Core services
├── features/
│   ├── admin/         # Admin components
│   ├── auth/          # Login/Register
│   ├── owner/         # Owner components
│   ├── tenant/        # Tenant components
│   └── shared/        # Shared components
├── app.config.ts      # App configuration
└── app.routes.ts      # Route definitions
```

## Testing

### Test User Accounts
After starting the backend, you can register test users with different roles:

- **Admin:** role: "admin"
- **Owner:** role: "owner"
- **Tenant:** role: "tenant"

## Development

### Backend Development
```bash
cd backend-api
npm run dev          # Start with nodemon
npm run build        # Build TypeScript
npm start            # Run production build
```

### Frontend Development
```bash
cd frontend-ui
npm start            # Development server
npm run build        # Production build
ng test              # Run tests
```

## Technologies Used

### Backend
- Node.js
- TypeScript
- Express.js
- MySQL2
- JWT (jsonwebtoken)
- Bcrypt
- Dotenv

### Frontend
- Angular 18+
- TypeScript
- RxJS
- SCSS
- Standalone Components

## License
MIT
