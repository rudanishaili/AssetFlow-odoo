import { ApiError } from '../common/errors/ApiError.js';

export const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden - Insufficient permissions'));
    }
    next();
  };
};