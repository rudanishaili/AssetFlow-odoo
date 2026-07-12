const ApiError = require('../common/errors/ApiError');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden access'));
    }
    next();
  };
};
