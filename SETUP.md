# Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher)
   - Download from https://nodejs.org/

2. **MySQL** (v8.0 or higher)
   - Download from https://dev.mysql.com/downloads/mysql/

3. **Git** (optional, for version control)

## Step-by-Step Setup

### 1. Database Setup

1. Start MySQL server

2. Run the database setup script:
   ```bash
   mysql -u root -p < database-setup.sql
   ```
   
   Or manually execute the SQL commands in `database-setup.sql`

3. Verify database creation:
   ```sql
   USE property_rental_db;
   SHOW TABLES;
   SELECT * FROM users;
   ```

### 2. Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` file with your MySQL credentials:
   ```env
   PORT=3000
   NODE_ENV=development

   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=property_rental_db

   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRES_IN=24h

   ALLOWED_ORIGINS=http://localhost:4200
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ✅ Database connected successfully
   ✅ Database tables initialized
   🚀 Server running on port 3000
   ```

### 3. Frontend Setup

1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd frontend-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The application will open at `http://localhost:4200`

## Testing the Application

### Test User Credentials

The database setup script creates three test users:

1. **Admin User**
   - Email: `admin@example.com`
   - Password: `Admin@123`
   - Role: Admin

2. **Owner User**
   - Email: `owner@example.com`
   - Password: `Owner@123`
   - Role: Owner

3. **Tenant User**
   - Email: `tenant@example.com`
   - Password: `Tenant@123`
   - Role: Tenant

### Testing Role-Based Access

1. **Login as Tenant:**
   - Use tenant credentials
   - You'll be redirected to `/tenant/properties`
   - Try accessing `/owner/dashboard` - you'll be redirected to `/unauthorized`

2. **Login as Owner:**
   - Use owner credentials
   - You'll be redirected to `/owner/dashboard`
   - Try accessing `/tenant/properties` - you'll be redirected to `/unauthorized`

3. **Login as Admin:**
   - Use admin credentials
   - You'll be redirected to `/admin/dashboard`
   - Admin has access to admin-specific routes only

## API Testing with Postman/cURL

### Register a New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123",
    "firstName": "Test",
    "lastName": "User",
    "role": "tenant",
    "phoneNumber": "+1234567890"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tenant@example.com",
    "password": "Tenant@123"
  }'
```

### Get Current User (with JWT token)
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### Backend Issues

1. **Database Connection Error:**
   - Check MySQL is running: `mysql -u root -p`
   - Verify credentials in `.env` file
   - Ensure database exists: `SHOW DATABASES;`

2. **Port Already in Use:**
   - Change PORT in `.env` file
   - Kill process using port: `netstat -ano | findstr :3000`

### Frontend Issues

1. **Cannot Connect to Backend:**
   - Verify backend is running on port 3000
   - Check `environment.ts` has correct API URL
   - Check browser console for CORS errors

2. **Module Not Found:**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

3. **Build Errors:**
   - Clear Angular cache: `ng cache clean`
   - Rebuild: `npm run build`

## Development Workflow

### Backend Development
```bash
cd backend-api
npm run dev      # Auto-restart on file changes
npm run build    # Compile TypeScript
npm start        # Run production build
```

### Frontend Development
```bash
cd frontend-ui
npm start        # Development server with live reload
npm run build    # Production build
ng test          # Run unit tests
```

## Production Deployment

### Backend
1. Set environment variables in production
2. Build: `npm run build`
3. Start: `npm start`

### Frontend
1. Build: `npm run build -- --configuration production`
2. Deploy `dist/` folder to web server
3. Configure environment variables

## Next Steps

1. Implement additional features:
   - Property listing management
   - Booking system
   - Payment integration
   - File uploads for property images

2. Add more security:
   - Rate limiting
   - CSRF protection
   - Input sanitization
   - SQL injection prevention

3. Improve UX:
   - Loading states
   - Error handling
   - Form validation messages
   - Toast notifications

## Support

For issues or questions, refer to:
- Backend README: `backend-api/README.md`
- Frontend README: `frontend-ui/README.md`
- Main README: `README.md`
