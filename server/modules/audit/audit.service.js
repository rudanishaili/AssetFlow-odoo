import prisma from '../../src/config/db.js';
import { ApiError } from '../../common/errors/ApiError.js';

export const createAuditCycle = async (name, scopeLocation, scopeDepartmentId, startDate, endDate) => {
  return prisma.auditCycle.create({
    data: {
      name,
      scopeLocation,
      scopeDepartmentId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: 'PLANNED'
    }
  });
};

export const addAuditorsAndItems = async (cycleId, assetIds, auditorId) => {
  const items = await Promise.all(assetIds.map(assetId => {
    return prisma.auditItem.create({
      data: {
        auditCycleId: cycleId,
        assetId,
        auditorId,
        status: 'PENDING'
      }
    });
  }));
  
  await prisma.auditCycle.update({
    where: { id: cycleId },
    data: { status: 'ACTIVE' }
  });
  
  return items;
};

export const verifyAuditItem = async (itemId, status, verificationNotes) => {
  const item = await prisma.auditItem.update({
    where: { id: itemId },
    data: { status, verificationNotes }
  });
  
  // Auto generate discrepancy if Damaged or Missing
  if (status === 'DAMAGED' || status === 'MISSING') {
    await prisma.auditDiscrepancy.create({
      data: {
        auditItemId: itemId,
        description: `Asset verification flagged as ${status}.`,
        status: 'OPEN'
      }
    });
  }
  
  return item;
};

export const closeCycle = async (cycleId, actionedById) => {
  const cycle = await prisma.auditCycle.findUnique({ where: { id: cycleId } });
  if (!cycle) throw new ApiError(404, 'Audit cycle not found');
  
  // Find missing items to mark asset status as LOST
  const missingItems = await prisma.auditItem.findMany({
    where: { auditCycleId: cycleId, status: 'MISSING' }
  });
  
  const assetIds = missingItems.map(item => item.assetId);
  
  await prisma.$transaction([
    prisma.auditCycle.update({ where: { id: cycleId }, data: { status: 'COMPLETED' } }),
    // Set affected asset statuses
    prisma.asset.updateMany({
      where: { id: { in: assetIds } },
      data: { status: 'LOST' }
    })
  ]);
  
  return { message: 'Audit cycle closed and discrepancy policies executed' };
};