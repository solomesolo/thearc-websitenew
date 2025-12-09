/**
 * Simple Logging Helper (MVP)
 * 
 * Replaces HIPAA-style audit logging with simple console logging.
 * No database writes - just console output for debugging.
 */

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
 * Simple console logging (replaces HIPAA audit logging)
 * 
 * In production, you might want to send this to a logging service,
 * but for MVP we just log to console.
 */
export async function logDataAccess(params: LogDataAccessParams) {
  // Simple console log for debugging
  if (process.env.NODE_ENV === "development") {
    console.log("[Audit]", {
      type: params.accessType,
      dataType: params.dataType,
      userId: params.userId,
      accessedBy: params.accessedBy,
      purpose: params.purpose,
    });
  }
  // In production, you could send to a logging service here
}
