const ErrorHandler = require('../common/errors/ErrorHandler');

module.exports = (err, req, res, next) => {
  ErrorHandler(err, req, res, next);
};
