import prisma from '../../src/config/db.js';
import { ApiError } from '../../common/errors/ApiError.js';

export const createMaintenanceRequest = async (assetId, issueDescription, priority, raisedById) => {
  return prisma.maintenanceRequest.create({
    data: {
      assetId,
      issueDescription,
      priority,
      raisedById,
      status: 'PENDING'
    }
  });
};

export const updateMaintenanceStatus = async (requestId, status, approvedById, technicianName, cost, nextMaintenanceDate) => {
  const request = await prisma.maintenanceRequest.findUnique({ where: { id: requestId } });
  if (!request) throw new ApiError(404, 'Maintenance request not found');
  
  const updateData = { status };
  if (status === 'APPROVED') {
    updateData.approvedById = approvedById;
    
    // Transaction to update request and mark asset as Under Maintenance
    await prisma.$transaction([
      prisma.maintenanceRequest.update({ where: { id: requestId }, data: updateData }),
      prisma.asset.update({ where: { id: request.assetId }, data: { status: 'UNDER_MAINTENANCE' } })
    ]);
  } else if (status === 'RESOLVED') {
    updateData.technicianName = technicianName;
    updateData.cost = cost ? parseFloat(cost) : null;
    updateData.nextMaintenanceDate = nextMaintenanceDate ? new Date(nextMaintenanceDate) : null;
    updateData.completedDate = new Date();
    
    // Transaction to complete and set asset back to Available
    await prisma.$transaction([
      prisma.maintenanceRequest.update({ where: { id: requestId }, data: updateData }),
      prisma.asset.update({ where: { id: request.assetId }, data: { status: 'AVAILABLE' } })
    ]);
  } else {
    await prisma.maintenanceRequest.update({ where: { id: requestId }, data: updateData });
  }
  
  return prisma.maintenanceRequest.findUnique({ where: { id: requestId } });
};