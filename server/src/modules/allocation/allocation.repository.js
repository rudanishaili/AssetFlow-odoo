import prisma from '../../config/db.js';

export const findAll = async () => {
  const list = await prisma.assetAssignment.findMany({
    include: {
      asset: true,
      employee: true
    }
  });
  return list.map(item => ({
    id: item.id,
    assetId: item.assetId,
    asset: item.asset,
    userId: item.employeeId,
    user: item.employee,
    allocatedBy: 'System Manager',
    allocatedAt: item.assignedDate,
    returnedAt: item.returnedDate,
    status: item.status
  }));
};

export const findById = async (id) => {
  const item = await prisma.assetAssignment.findUnique({
    where: { id },
    include: {
      asset: true,
      employee: true
    }
  });
  if (!item) return null;
  return {
    id: item.id,
    assetId: item.assetId,
    asset: item.asset,
    userId: item.employeeId,
    user: item.employee,
    allocatedBy: 'System Manager',
    allocatedAt: item.assignedDate,
    returnedAt: item.returnedDate,
    status: item.status
  };
};

export const create = async (data) => {
  return prisma.assetAssignment.create({
    data: {
      assetId: data.assetId,
      employeeId: data.userId,
      assignedDate: data.allocatedAt || new Date(),
      status: 'ACTIVE'
    }
  });
};

export const update = async (id, data) => {
  return prisma.assetAssignment.update({
    where: { id },
    data: {
      status: data.status,
      returnedDate: data.returnedAt
    }
  });
};

// Allocation Request queries
export const findAllRequests = async () => {
  return prisma.allocationRequest.findMany({
    include: {
      user: true
    }
  });
};

export const findRequestById = async (id) => {
  return prisma.allocationRequest.findUnique({
    where: { id },
    include: {
      user: true
    }
  });
};

export const createRequest = async (data) => {
  return prisma.allocationRequest.create({
    data
  });
};

export const updateRequest = async (id, data) => {
  return prisma.allocationRequest.update({
    where: { id },
    data
  });
};

export default {
  findAll,
  findById,
  create,
  update,
  findAllRequests,
  findRequestById,
  createRequest,
  updateRequest
};
