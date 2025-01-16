import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Helper to query the database
const queryDb = async (query, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
};

// Create User
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const userRole = role || 'user';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
    const user = await queryDb(query, [name, email, hashedPassword, userRole]);
    res.status(201).json(user[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await queryDb('SELECT id, name, email, role FROM users', []);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Normal user gets their own details
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }

    const user = await queryDb('SELECT id, name, email, role FROM users WHERE id = $1', [id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const query = 'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *';
    const user = await queryDb(query, [name, email, role, id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const user = await queryDb(query, [id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await queryDb('SELECT * FROM users WHERE email = $1', [email]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
