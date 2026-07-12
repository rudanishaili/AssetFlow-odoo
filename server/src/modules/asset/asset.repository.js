import prisma from '../../config/db.js';

export const findAll = async () => {
  const assets = await prisma.asset.findMany({
    include: {
      categoryRelation: true,
      vendor: true,
      assignments: {
        where: { status: 'ACTIVE' },
        include: { employee: true, department: true }
      }
    }
  });

  return assets.map(asset => ({
    ...asset,
    category: asset.categoryRelation?.name || asset.category || 'General',
    value: asset.value || Number(asset.acquisitionCost) || 0,
    code: asset.code || asset.assetTag,
    allocations: asset.assignments.map(as => ({
      id: as.id,
      assetId: as.assetId,
      userId: as.employeeId,
      user: as.employee ? { id: as.employee.id, name: as.employee.name, email: as.employee.email, role: as.employee.role } : null,
      allocatedBy: 'System Manager',
      allocatedAt: as.assignedDate,
      returnedAt: as.returnedDate,
      status: as.status
    }))
  }));
};

export const findById = async (id) => {
  const asset = await prisma.asset.findUnique({
    where: { id },
    include: {
      categoryRelation: true,
      vendor: true,
      assignments: {
        include: { employee: true, department: true }
      },
      maintenance: {
        include: { raisedBy: true }
      },
      auditItems: {
        include: { auditor: true }
      }
    }
  });

  if (!asset) return null;

  return {
    ...asset,
    category: asset.categoryRelation?.name || asset.category || 'General',
    value: asset.value || Number(asset.acquisitionCost) || 0,
    code: asset.code || asset.assetTag,
    allocations: asset.assignments.map(as => ({
      id: as.id,
      assetId: as.assetId,
      userId: as.employeeId,
      user: as.employee ? { id: as.employee.id, name: as.employee.name, email: as.employee.email, role: as.employee.role } : null,
      allocatedBy: 'System Manager',
      allocatedAt: as.assignedDate,
      returnedAt: as.returnedDate,
      status: as.status
    })),
    maintenances: asset.maintenance.map(m => ({
      id: m.id,
      assetId: m.assetId,
      description: m.issueDescription,
      cost: Number(m.cost || 0),
      status: m.status,
      startDate: m.scheduledDate || m.createdAt,
      endDate: m.completedDate
    })),
    audits: asset.auditItems.map(au => ({
      id: au.id,
      assetId: au.assetId,
      auditorId: au.auditorId,
      auditor: au.auditor,
      status: au.status,
      findings: au.verificationNotes,
      auditedAt: au.verifiedAt
    }))
  };
};

export const create = async (data) => {
  return prisma.asset.create({
    data
  });
};

export const update = async (id, data) => {
  return prisma.asset.update({
    where: { id },
    data
  });
};

export const remove = async (id) => {
  return prisma.asset.delete({
    where: { id }
  });
};

export default {
  findAll,
  findById,
  create,
  update,
  remove
};
