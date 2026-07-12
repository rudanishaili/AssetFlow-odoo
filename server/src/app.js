import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from './config/logger.js';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';
import notFoundMiddleware from './middlewares/notFound.middleware.js';

const app = express();

// CORS Configuration
app.use(cors({
  origin: '*', // Customize for production as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Request body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP logging through Morgan streamed to Winston logger
const morganStream = {
  write: (message) => logger.http(message.trim()),
};
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: morganStream }));

// Welcome Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the AssetFlow API',
    version: '1.0.0',
  });
});

// API Routes
app.use('/api', routes);

// Error Middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
