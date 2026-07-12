import prisma from '../../config/db.js';

export const findAll = async () => {
  const list = await prisma.resourceBooking.findMany({
    include: {
      asset: true,
      booker: true
    }
  });
  return list.map(item => ({
    id: item.id,
    assetId: item.assetId,
    asset: item.asset,
    userId: item.bookerId,
    user: item.booker,
    startDate: item.startTime,
    endDate: item.endTime,
    status: item.status,
    purpose: 'Shared Resource Booking'
  }));
};

export const findById = async (id) => {
  const item = await prisma.resourceBooking.findUnique({
    where: { id },
    include: {
      asset: true,
      booker: true
    }
  });
  if (!item) return null;
  return {
    id: item.id,
    assetId: item.assetId,
    asset: item.asset,
    userId: item.bookerId,
    user: item.booker,
    startDate: item.startTime,
    endDate: item.endTime,
    status: item.status,
    purpose: 'Shared Resource Booking'
  };
};

export const create = async (data) => {
  return prisma.resourceBooking.create({
    data: {
      assetId: data.assetId,
      bookerId: data.userId,
      startTime: data.startDate,
      endTime: data.endDate,
      status: 'UPCOMING'
    }
  });
};

export const update = async (id, data) => {
  return prisma.resourceBooking.update({
    where: { id },
    data: {
      status: data.status
    }
  });
};

export default {
  findAll,
  findById,
  create,
  update
};
