/**
 * Audit Logging System
 * 
 * HIPAA and GDPR require comprehensive audit logs of all data access.
 * This module provides utilities for logging all data access events.
 */

import { prisma } from "./prisma";

export interface LogDataAccessParams {
  userId?: string;
  responseId?: string;
  accessedBy: string;
  accessType: "read" | "create" | "update" | "delete" | "export";
  dataType: string;
  ipAddress?: string;
  userAgent?: string;
  fieldsAccessed?: string[];
  purpose?: string;
}

/**
 * Log data access event
 * 
 * HIPAA requires logging:
 * - Who accessed the data
 * - What data was accessed
 * - When it was accessed
 * - Why it was accessed
 */
export async function logDataAccess(params: LogDataAccessParams) {
  try {
    await prisma.dataAccessLog.create({
      data: {
        userId: params.userId,
        responseId: params.responseId,
        accessedBy: params.accessedBy,
        accessType: params.accessType,
        dataType: params.dataType,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        fieldsAccessed: params.fieldsAccessed
          ? JSON.stringify(params.fieldsAccessed)
          : null,
        purpose: params.purpose,
      },
    });
  } catch (error) {
    // Don't fail the main operation if logging fails, but log the error
    console.error("Failed to create audit log:", error);
    // In production, you might want to send this to a monitoring service
  }
}

/**
 * Get audit logs for a user (for transparency/GDPR)
 */
export async function getUserAuditLogs(
  userId: string,
  requestedBy: string,
  page: number = 1,
  limit: number = 50
) {
  // Verify user is requesting their own audit logs
  if (userId !== requestedBy) {
    throw new Error("Unauthorized access to audit logs");
  }

  const skip = (page - 1) * limit;

  const [logs, total] = await Promise.all([
    prisma.dataAccessLog.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { timestamp: "desc" },
    }),
    prisma.dataAccessLog.count({ where: { userId } }),
  ]);

  // Log this access too
  await logDataAccess({
    userId,
    accessedBy: requestedBy,
    accessType: "read",
    dataType: "audit_log",
    purpose: "User requested audit log",
  });

  return {
    logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get audit logs for a questionnaire response
 */
export async function getResponseAuditLogs(responseId: string, requestedBy: string) {
  const response = await prisma.questionnaireResponse.findUnique({
    where: { id: responseId },
  });

  if (!response) {
    throw new Error("Questionnaire response not found");
  }

  // Verify user has access
  if (response.userId !== requestedBy) {
    throw new Error("Unauthorized access");
  }

  const logs = await prisma.dataAccessLog.findMany({
    where: { responseId },
    orderBy: { timestamp: "desc" },
  });

  // Log this access
  await logDataAccess({
    userId: response.userId,
    responseId,
    accessedBy: requestedBy,
    accessType: "read",
    dataType: "audit_log",
    purpose: "User requested response audit log",
  });

  return logs;
}

