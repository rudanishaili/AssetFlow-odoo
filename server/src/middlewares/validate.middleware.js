import ApiError from '../common/errors/ApiError.js';
import HTTP_STATUS from '../common/constants/httpStatus.js';

/**
 * Express middleware to validate request payload.
 * @param {Function} validatorFunc - Function that validates payload and returns { error, value }
 */
export const validateMiddleware = (validatorFunc) => {
  return (req, res, next) => {
    const { error, value } = validatorFunc(req.body);
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: 'Validation Failed',
        errors: error,
      });
    }
    // Set validated body
    req.body = value;
    next();
  };
};

export default validateMiddleware;
