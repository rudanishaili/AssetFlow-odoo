import { verifyToken } from '../config/jwt.js';
import prisma from '../config/db.js';
import ApiError from '../common/errors/ApiError.js';
import HTTP_STATUS from '../common/constants/httpStatus.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication token missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    
    try {
      decoded = verifyToken(token);
    } catch (err) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Token expired or malformed');
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        department: true,
      },
    });

    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'User no longer exists');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
