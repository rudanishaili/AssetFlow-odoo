import prisma from '../../src/config/db.js';
import logger from '../../src/config/logger.js';

export const logAction = async (userId, action, details, ipAddress = null) => {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        details,
        ipAddress,
        userId
      }
    });
  } catch (err) {
    logger.error('Failed to log audit activity: ' + err.message);
  }
};