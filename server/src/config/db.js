import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import logger from './logger.js';
import 'dotenv/config';

let prisma;

try {
  const url = new URL(process.env.DATABASE_URL);
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: url.port ? parseInt(url.port) : 3306,
    user: url.username,
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ''),
    connectionLimit: 10
  });

  prisma = new PrismaClient({ adapter });
} catch (err) {
  logger.error('Failed to parse database connection URL or initialize Prisma adapter: ' + err.message);
}

export const connectDB = async () => {
  try {
    if (prisma) {
      await prisma.$connect();
      logger.info('Prisma Client connected successfully to database via MariaDB/MySQL Driver Adapter.');
    }
  } catch (err) {
    logger.error('Error connecting to database via Prisma: ' + err.message);
  }
};

export default prisma;