const ApiError = require('../common/errors/ApiError');

module.exports = (schema) => (req, res, next) => {
  // Can be wired to standard object validation logic (like Joi or Zod)
  // Standard placeholder checking for required fields listed in dynamic schemas
  if (schema && typeof schema.validate === 'function') {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(new ApiError(400, error.message));
    }
    req.body = value;
  }
  next();
};
