# Backend API - Property Rental System

Industrial-grade Node.js/TypeScript backend with role-based authentication.

## Project Structure

```
src/
├── config/          # Configuration files (database, environment)
├── controllers/     # Request handlers
├── middleware/      # Express middleware (auth, validation, error handling)
├── models/          # Database models
├── routes/          # API route definitions
├── services/        # Business logic layer
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── validators/      # Input validation
└── server.ts        # Application entry point
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MySQL credentials and JWT secret.

3. **Setup MySQL database:**
   - Create database: `CREATE DATABASE property_rental_db;`
   - Tables will be created automatically on first run

4. **Run in development:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `GET /api/auth/verify` - Verify JWT token (requires auth)

### Health Check
- `GET /api/health` - API health status

## User Roles
- **admin** - Full system access
- **owner** - Property management access
- **tenant** - Property rental access

## Technologies
- Node.js + TypeScript
- Express.js
- MySQL2
- JWT Authentication
- Bcrypt password hashing
