import jwt from 'jsonwebtoken';
import prisma from '../src/config/db.js';
import { ApiError } from '../common/errors/ApiError.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Unauthorized - Access token is missing'));
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkeyforassetflow');
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { department: true }
    });
    
    if (!user || user.status === 'INACTIVE') {
      return next(new ApiError(401, 'Unauthorized - User account is inactive or deleted'));
    }
    
    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, 'Unauthorized - Invalid or expired token'));
  }
};