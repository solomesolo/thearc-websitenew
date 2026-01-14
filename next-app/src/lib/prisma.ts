// Prisma has been removed - this is a stub for API routes that reference it
// All database functionality has been disabled

export const prisma = {
  user: {
    findUnique: async () => null,
    findFirst: async () => null,
    create: async () => {
      throw new Error("Database not available - Prisma has been removed");
    },
    update: async () => {
      throw new Error("Database not available - Prisma has been removed");
    },
    delete: async () => {
      throw new Error("Database not available - Prisma has been removed");
    },
    count: async () => 0,
  },
  questionnaireResponse: {
    create: async () => {
      throw new Error("Database not available - Prisma has been removed");
    },
    findMany: async () => [],
    findUnique: async () => null,
  },
  consent: {
    create: async () => {
      throw new Error("Database not available - Prisma has been removed");
    },
    findMany: async () => [],
  },
  verificationToken: {
    create: async () => {
      throw new Error("Database not available - Prisma has been removed");
    },
    findUnique: async () => null,
    delete: async () => {
      throw new Error("Database not available - Prisma has been removed");
    },
  },
  passwordResetToken: {
    create: async () => {
      throw new Error("Database not available - Prisma has been removed");
    },
    findUnique: async () => null,
    delete: async () => {
      throw new Error("Database not available - Prisma has been removed");
    },
  },
  $connect: async () => {},
  $disconnect: async () => {},
} as any;
