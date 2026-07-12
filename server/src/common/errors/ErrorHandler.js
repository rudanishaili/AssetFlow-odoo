import { env } from '../../config/env.js';
import { logger } from '../../config/logger.js';

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Handle default statuses
  if (!statusCode) statusCode = 500;
  if (!message) message = 'Internal Server Error';

  const response = {
    success: false,
    statusCode,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (statusCode === 500) {
    logger.error(`[500 Internal Error] - ${err.message} \n ${err.stack}`);
  } else {
    logger.warn(`[API Warning] [${statusCode}] - ${message}`);
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
