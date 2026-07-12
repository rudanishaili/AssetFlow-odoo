const app = require('./app');
const env = require('./config/env');

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[AssetFlow Server] listening on port ${PORT} in ${env.NODE_ENV} mode.`);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...', err);
  server.close(() => {
    process.exit(1);
  });
});
