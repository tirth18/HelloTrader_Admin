import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock user database for development
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    username: 'admin',
    password: '$2a$10$8KHu.GZ.A5O6NdQ1TmGbw.vh8jvw0uH1eBm/zGRbk9x1N2eH28O9y', // hashed 'admin123'
    transactionPassword: '$2a$10$GhQzoBfJKnLsEHY./nLCVOiv9xjGNwJLV./YuY0juo3gO3AUnQdqy', // hashed 'tx123'
    role: 'admin'
  },
  {
    id: '2',
    email: 'broker@example.com',
    username: 'broker1',
    password: '$2a$10$8KHu.GZ.A5O6NdQ1TmGbw.vh8jvw0uH1eBm/zGRbk9x1N2eH28O9y', // hashed 'admin123'
    transactionPassword: '$2a$10$GhQzoBfJKnLsEHY./nLCVOiv9xjGNwJLV./YuY0juo3gO3AUnQdqy', // hashed 'tx123'
    role: 'broker'
  }
];

export async function verifyCredentials(email: string, password: string) {
  // Find user by email
  const user = users.find(u => u.email === email);
  if (!user) {
    return null;
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  return user;
}

export async function verifyTransactionPassword(userId: string, password: string) {
  // Find user by id
  const user = users.find(u => u.id === userId);
  if (!user) {
    return false;
  }

  // Verify password
  return bcrypt.compare(password, user.transactionPassword);
}

export async function changeTransactionPassword(userId: string, oldPassword: string, newPassword: string) {
  // Find user by id
  const user = users.find(u => u.id === userId);
  if (!user) {
    return { success: false, message: 'User not found' };
  }

  // Verify old password
  const isValid = await bcrypt.compare(oldPassword, user.transactionPassword);
  if (!isValid) {
    return { success: false, message: 'Invalid current password' };
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // In a real app, update user in database
  // For mock purposes, just update the in-memory object
  user.transactionPassword = hashedPassword;

  return { success: true, message: 'Transaction password updated successfully' };
}

export function generateToken(user: any) {
  // In a real app, use process.env.JWT_SECRET
  const SECRET_KEY = 'your-secret-key-here';
  
  return jwt.sign(
    { 
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    },
    SECRET_KEY,
    { expiresIn: '1d' }
  );
}

export function verifyToken(token: string) {
  try {
    // In a real app, use process.env.JWT_SECRET
    const SECRET_KEY = 'your-secret-key-here';
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

export function getUserById(userId: string) {
  const user = users.find(u => u.id === userId);
  if (!user) return null;
  
  // Don't return sensitive information
  const { password, transactionPassword, ...userWithoutPassword } = user;
  return userWithoutPassword;
} 