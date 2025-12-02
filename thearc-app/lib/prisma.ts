import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma 7 configuration
// If using Prisma Accelerate (prisma+postgres://), extract accelerateUrl
const databaseUrl = process.env.DATABASE_URL || "";
const isAccelerate = databaseUrl.startsWith("prisma+");

const prismaOptions: any = {
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
};

// For Prisma Accelerate, use the full connection string as accelerateUrl
if (isAccelerate) {
  prismaOptions.accelerateUrl = databaseUrl;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

