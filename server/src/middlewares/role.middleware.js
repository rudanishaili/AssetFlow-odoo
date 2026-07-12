import ApiError from '../common/errors/ApiError.js';
import HTTP_STATUS from '../common/constants/httpStatus.js';

export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          `Access denied. Requires one of the following roles: ${allowedRoles.join(', ')}`
        )
      );
    }

    next();
  };
};

export default roleMiddleware;
