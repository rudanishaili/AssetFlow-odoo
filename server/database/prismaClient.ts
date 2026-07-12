import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { URL } from 'url';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environmental variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dbUrlString = process.env.DATABASE_URL;
if (!dbUrlString) {
  throw new Error("DATABASE_URL environment variable is missing");
}

const parsedUrl = new URL(dbUrlString);
const adapter = new PrismaMariaDb({
  host: parsedUrl.hostname || 'localhost',
  port: parseInt(parsedUrl.port || '3306', 10),
  user: parsedUrl.username || 'root',
  password: decodeURIComponent(parsedUrl.password || ''),
  database: parsedUrl.pathname.replace('/', ''),
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });
