import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma 7 configuration
// Supports both direct PostgreSQL and Prisma Accelerate
const databaseUrl = process.env.DATABASE_URL || "";

// Warn if DATABASE_URL is not set
if (!databaseUrl && process.env.NODE_ENV === "development") {
  console.warn("⚠️  DATABASE_URL environment variable is not set. Database operations will fail.");
}

const prismaOptions: any = {
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
};

// Check if using Prisma Accelerate (prisma+postgres://)
const isAccelerate = databaseUrl.startsWith("prisma+");

if (isAccelerate) {
  // For Prisma Accelerate, use the full connection string as accelerateUrl
  prismaOptions.accelerateUrl = databaseUrl;
} else if (databaseUrl) {
  // For direct PostgreSQL connection, use PostgreSQL adapter
  // Parse connection string to avoid encoding issues
  try {
    const url = new URL(databaseUrl.replace(/^postgresql:/, 'postgres:'));
  
  // For Supabase, we need to handle SSL properly
  const isSupabase = url.hostname.includes('supabase.co');
  
  // Check if using connection pooler (pgbouncer)
  const isPgbouncer = url.searchParams.get('pgbouncer') === 'true';
  const connectionLimit = url.searchParams.get('connection_limit');
  
  const poolConfig: any = {
    host: url.hostname,
    port: parseInt(url.port) || 5432,
    database: url.pathname.slice(1), // Remove leading /
    // Handle session pooler username format: postgres.project-ref
    user: url.username.includes('.') ? url.username : url.username,
    password: decodeURIComponent(url.password),
    // Use SSL for remote connections (like Supabase), disable for localhost
    ssl: url.hostname !== 'localhost' && url.hostname !== '127.0.0.1' ? { 
      rejectUnauthorized: false,
      // Supabase requires SSL but with rejectUnauthorized: false for self-signed certs
      ...(isSupabase ? {
        require: true,
        rejectUnauthorized: false
      } : {
        require: true
      })
    } : false,
    // Connection timeout settings
    connectionTimeoutMillis: 30000, // Increased timeout for Supabase
    query_timeout: 30000,
    // Pool settings - respect connection_limit for serverless
    max: connectionLimit ? parseInt(connectionLimit) : (isPgbouncer ? 1 : 10),
    idleTimeoutMillis: 30000,
    keepAlive: true,
  };
  
    const pool = new Pool(poolConfig);
    const adapter = new PrismaPg(pool);
    prismaOptions.adapter = adapter;
  } catch (error) {
    console.error("❌ Failed to parse DATABASE_URL:", error);
    if (process.env.NODE_ENV === "development") {
      console.error("DATABASE_URL format:", databaseUrl.substring(0, 20) + "...");
    }
  }
} else {
  // No database URL provided
  console.warn("⚠️  No DATABASE_URL provided. Prisma client will not be able to connect.");
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

