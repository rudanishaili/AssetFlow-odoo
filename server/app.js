import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';
import notFoundMiddleware from './middlewares/notFound.middleware.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;