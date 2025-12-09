import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma 7 configuration
// Supports both direct PostgreSQL and Prisma Accelerate
const databaseUrl = process.env.DATABASE_URL || "";

const prismaOptions: any = {
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
};

// Check if using Prisma Accelerate (prisma+postgres://)
const isAccelerate = databaseUrl.startsWith("prisma+");

if (isAccelerate) {
  // For Prisma Accelerate, use the full connection string as accelerateUrl
  prismaOptions.accelerateUrl = databaseUrl;
} else {
  // For direct PostgreSQL connection, use PostgreSQL adapter
  // Parse connection string to avoid encoding issues
  const url = new URL(databaseUrl.replace(/^postgresql:/, 'postgres:'));
  
  const poolConfig: any = {
    host: url.hostname,
    port: parseInt(url.port) || 5432,
    database: url.pathname.slice(1), // Remove leading /
    user: url.username,
    password: decodeURIComponent(url.password),
    // Use SSL for remote connections (like Supabase), disable for localhost
    ssl: url.hostname !== 'localhost' && url.hostname !== '127.0.0.1' ? { rejectUnauthorized: false } : false,
  };
  
  const pool = new Pool(poolConfig);
  const adapter = new PrismaPg(pool);
  prismaOptions.adapter = adapter;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
