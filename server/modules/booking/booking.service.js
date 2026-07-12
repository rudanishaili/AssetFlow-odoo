import prisma from '../../src/config/db.js';
import { ApiError } from '../../common/errors/ApiError.js';

export const bookResource = async (assetId, bookerId, startTime, endTime) => {
  const asset = await prisma.asset.findUnique({ where: { id: assetId } });
  if (!asset || !asset.isSharedBookable) {
    throw new ApiError(400, 'This asset is not marked as a shared bookable resource');
  }
  
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (start >= end) {
    throw new ApiError(400, 'Start time must be before end time');
  }
  
  // Overlap verification
  const conflict = await prisma.resourceBooking.findFirst({
    where: {
      assetId,
      status: { in: ['UPCOMING', 'ONGOING'] },
      OR: [
        { startTime: { lt: end }, endTime: { gt: start } }
      ]
    }
  });
  
  if (conflict) {
    throw new ApiError(400, 'Time slot overlaps with an existing booking');
  }
  
  return prisma.resourceBooking.create({
    data: {
      assetId,
      bookerId,
      startTime: start,
      endTime: end,
      status: 'UPCOMING'
    }
  });
};

export const getBookings = async (assetId) => {
  return prisma.resourceBooking.findMany({
    where: { assetId },
    include: { booker: true },
    orderBy: { startTime: 'asc' }
  });
};