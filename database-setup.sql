-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS property_rental_db;

-- Use the database
USE property_rental_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role ENUM('admin', 'owner', 'tenant') NOT NULL,
  phone_number VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample admin user (password: Admin@123)
INSERT INTO users (email, password, first_name, last_name, role, phone_number) 
VALUES (
  'admin@example.com', 
  '$2a$10$8K1p/a0dL3LXh0bS/xGNs.Q5YqH5y7N1hFb5QGz7oH8VXoO5QGz7i', 
  'Admin', 
  'User', 
  'admin',
  '+1234567890'
);

-- Insert sample owner user (password: Owner@123)
INSERT INTO users (email, password, first_name, last_name, role, phone_number) 
VALUES (
  'owner@example.com', 
  '$2a$10$8K1p/a0dL3LXh0bS/xGNs.Q5YqH5y7N1hFb5QGz7oH8VXoO5QGz7i', 
  'John', 
  'Owner', 
  'owner',
  '+1234567891'
);

-- Insert sample tenant user (password: Tenant@123)
INSERT INTO users (email, password, first_name, last_name, role, phone_number) 
VALUES (
  'tenant@example.com', 
  '$2a$10$8K1p/a0dL3LXh0bS/xGNs.Q5YqH5y7N1hFb5QGz7oH8VXoO5QGz7i', 
  'Jane', 
  'Tenant', 
  'tenant',
  '+1234567892'
);

-- Display created users
SELECT id, email, first_name, last_name, role, is_active, created_at FROM users;
