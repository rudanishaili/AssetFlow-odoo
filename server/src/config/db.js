import { PrismaClient } from '@prisma/client';
import { env } from './env.js';

let prisma;

if (env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Prevent multiple Prisma instances in dev mode due to hot reloading
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = global.prisma;
}

export default prisma;
export { prisma };
