import app from './app.js';
import { env } from './config/env.js';
import logger from './config/logger.js';

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`AssetFlow backend listening on port ${PORT} in ${env.NODE_ENV} mode`);
  logger.info(`API Base URL: http://localhost:${PORT}/api`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Promise Rejection: ${err.message}`);
  logger.error(err.stack || 'No stack trace available');
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  logger.error(err.stack || 'No stack trace available');
  process.exit(1);
});

// Restart trigger comment to reload nodemon following port release.
