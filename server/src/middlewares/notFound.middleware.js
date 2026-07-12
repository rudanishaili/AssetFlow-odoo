import ApiError from '../common/errors/ApiError.js';
import HTTP_STATUS from '../common/constants/httpStatus.js';

export const notFoundMiddleware = (req, res, next) => {
  next(new ApiError(HTTP_STATUS.NOT_FOUND, `Route not found - ${req.originalUrl}`));
};

export default notFoundMiddleware;
