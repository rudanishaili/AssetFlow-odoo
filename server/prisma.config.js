import "dotenv/config";

export default {
  schema: "database/schema/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
};