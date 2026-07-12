const ApiError = require('../common/errors/ApiError');

module.exports = (req, res, next) => {
  next(new ApiError(404, 'Endpoint path not found'));
};
