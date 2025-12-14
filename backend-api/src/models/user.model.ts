import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { pool } from '../config/database';
import { User, UserDTO, UserRole } from '../types';

export class UserModel {
  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phoneNumber: user.phoneNumber,
      isActive: user.isActive
    };
  }

  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      firstName: row.first_name,
      lastName: row.last_name,
      role: row.role as UserRole,
      phoneNumber: row.phone_number,
      isActive: Boolean(row.is_active),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  static async findById(id: number): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      firstName: row.first_name,
      lastName: row.last_name,
      role: row.role as UserRole,
      phoneNumber: row.phone_number,
      isActive: Boolean(row.is_active),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  static async create(user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phoneNumber?: string;
  }): Promise<User> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO users (email, password, first_name, last_name, role, phone_number)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user.email, user.password, user.firstName, user.lastName, user.role, user.phoneNumber || null]
    );

    const createdUser = await this.findById(result.insertId);
    if (!createdUser) {
      throw new Error('Failed to create user');
    }

    return createdUser;
  }

  static async update(id: number, updates: Partial<User>): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.firstName) {
      fields.push('first_name = ?');
      values.push(updates.firstName);
    }
    if (updates.lastName) {
      fields.push('last_name = ?');
      values.push(updates.lastName);
    }
    if (updates.phoneNumber !== undefined) {
      fields.push('phone_number = ?');
      values.push(updates.phoneNumber);
    }
    if (updates.isActive !== undefined) {
      fields.push('is_active = ?');
      values.push(updates.isActive);
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  static async findAll(): Promise<User[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users');

    return rows.map(row => ({
      id: row.id,
      email: row.email,
      password: row.password,
      firstName: row.first_name,
      lastName: row.last_name,
      role: row.role as UserRole,
      phoneNumber: row.phone_number,
      isActive: Boolean(row.is_active),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
  }
}
