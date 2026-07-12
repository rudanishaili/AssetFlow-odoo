import prisma from '../../config/db.js';

export const findAll = async () => {
  const list = await prisma.maintenanceRequest.findMany({
    include: {
      asset: true
    }
  });
  return list.map(item => ({
    id: item.id,
    assetId: item.assetId,
    asset: item.asset,
    description: item.issueDescription,
    cost: Number(item.cost || 0),
    status: item.status,
    startDate: item.scheduledDate || item.createdAt,
    endDate: item.completedDate
  }));
};

export const findById = async (id) => {
  const item = await prisma.maintenanceRequest.findUnique({
    where: { id },
    include: {
      asset: true
    }
  });
  if (!item) return null;
  return {
    id: item.id,
    assetId: item.assetId,
    asset: item.asset,
    description: item.issueDescription,
    cost: Number(item.cost || 0),
    status: item.status,
    startDate: item.scheduledDate || item.createdAt,
    endDate: item.completedDate
  };
};

export const create = async (data) => {
  return prisma.maintenanceRequest.create({
    data: {
      assetId: data.assetId,
      raisedById: data.userId || 'employee-id',
      issueDescription: data.description,
      priority: data.priority || 'MEDIUM',
      status: 'PENDING',
      cost: data.cost || 0
    }
  });
};

export const update = async (id, data) => {
  return prisma.maintenanceRequest.update({
    where: { id },
    data: {
      status: data.status,
      cost: data.cost,
      completedDate: data.status === 'RESOLVED' ? new Date() : null
    }
  });
};

export default {
  findAll,
  findById,
  create,
  update
};
