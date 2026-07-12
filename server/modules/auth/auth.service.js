import prisma from '../../src/config/db.js';
import { hashPassword } from '../../common/helpers/crypto.js';
import { generateToken } from '../../src/config/jwt.js';
import { ApiError } from '../../common/errors/ApiError.js';

export const register = async (name, email, password) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ApiError(400, 'User with this email already exists');
  }
  
  const hashedPassword = hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'EMPLOYEE'
    }
  });
  
  return { id: user.id, name: user.name, email: user.email, role: user.role };
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status === 'INACTIVE') {
    throw new ApiError(400, 'Invalid credentials or account is suspended');
  }
  
  const hashedPassword = hashPassword(password);
  if (user.password !== hashedPassword) {
    throw new ApiError(400, 'Invalid credentials');
  }
  
  const token = generateToken({ id: user.id, role: user.role });
  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token
  };
};