require('dotenv').config();

module.exports = {
  schema: "./database/prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: "npx tsx database/seeders/seed.ts",
  },
};
