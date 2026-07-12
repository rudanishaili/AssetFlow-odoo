import prisma from '../../src/config/db.js';
import { ApiError } from '../../common/errors/ApiError.js';

export const allocateAsset = async (assetId, employeeId, departmentId, expectedReturnDate) => {
  // Confirm asset is available
  const asset = await prisma.asset.findUnique({ where: { id: assetId } });
  if (!asset) throw new ApiError(404, 'Asset not found');
  
  if (asset.status !== 'AVAILABLE') {
    // Asset already held. Look up active allocation
    const active = await prisma.assetAssignment.findFirst({
      where: { assetId, status: 'ACTIVE' },
      include: { employee: true }
    });
    const holderName = active?.employee?.name || 'another department';
    throw new ApiError(400, `Asset already allocated. Currently held by ${holderName}.`);
  }
  
  // Transaction to update asset state and add assignment
  const [assignment] = await prisma.$transaction([
    prisma.assetAssignment.create({
      data: {
        assetId,
        employeeId,
        departmentId,
        expectedReturnDate: expectedReturnDate ? new Date(expectedReturnDate) : null,
        status: 'ACTIVE'
      }
    }),
    prisma.asset.update({
      where: { id: assetId },
      data: { status: 'ALLOCATED' }
    })
  ]);

  // Generate Notification
  if (employeeId) {
    await prisma.notification.create({
      data: {
        userId: employeeId,
        title: 'Asset Allocated',
        message: `You have been allocated asset ${asset.name} (${asset.assetTag})`,
        type: 'ALLOCATION'
      }
    });
  }
  
  return assignment;
};

export const returnAsset = async (assetId, checkInNotes) => {
  const activeAssignment = await prisma.assetAssignment.findFirst({
    where: { assetId, status: 'ACTIVE' }
  });
  if (!activeAssignment) throw new ApiError(400, 'No active allocation found for this asset');
  
  await prisma.$transaction([
    prisma.assetAssignment.update({
      where: { id: activeAssignment.id },
      data: {
        status: 'RETURNED',
        returnedDate: new Date(),
        conditionCheckInNotes: checkInNotes
      }
    }),
    prisma.asset.update({
      where: { id: assetId },
      data: { status: 'AVAILABLE' }
    })
  ]);
  
  return { message: 'Asset successfully returned and reverted to Available' };
};

export const createTransfer = async (assetId, requesterId, targetEmployeeId, targetDepartmentId, notes) => {
  return prisma.assetRequest.create({
    data: {
      assetId,
      requesterId,
      targetEmployeeId,
      targetDepartmentId,
      requestType: 'TRANSFER',
      notes
    }
  });
};

export const processTransferRequest = async (requestId, approved, actionedById) => {
  const request = await prisma.assetRequest.findUnique({
    where: { id: requestId },
    include: { asset: true }
  });
  if (!request || request.status !== 'PENDING') {
    throw new ApiError(400, 'Request not found or already processed');
  }
  
  if (!approved) {
    return prisma.assetRequest.update({
      where: { id: requestId },
      data: { status: 'REJECTED', actionedById }
    });
  }
  
  // Transaction for complete transfer re-allocation
  const [updatedRequest] = await prisma.$transaction([
    prisma.assetRequest.update({
      where: { id: requestId },
      data: { status: 'APPROVED', actionedById }
    }),
    // Close active assignment
    prisma.assetAssignment.updateMany({
      where: { assetId: request.assetId, status: 'ACTIVE' },
      data: { status: 'RETURNED', returnedDate: new Date(), conditionCheckInNotes: 'Transferred' }
    }),
    // Open new assignment
    prisma.assetAssignment.create({
      data: {
        assetId: request.assetId,
        employeeId: request.targetEmployeeId,
        departmentId: request.targetDepartmentId,
        status: 'ACTIVE'
      }
    })
  ]);
  
  return updatedRequest;
};