import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
  const { entityTitle, entityType, action } = log

  switch (action) {
    case ACTION.CREATE:
      return `created ${entityType.toLowerCase()} "${entityTitle}"`
    case ACTION.UPDATE:
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`
    case ACTION.DELETE:
      return `deleted ${entityType.toLowerCase()} "${entityTitle}"`
    default:
      return `Unknown action ${entityType.toLowerCase()} "${entityTitle}"`
  }
}