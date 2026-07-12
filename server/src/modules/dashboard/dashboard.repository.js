import prisma from '../../config/db.js';

export const getAdminStats = async () => {
  const departmentsCount = await prisma.department.count();
  const categoriesCount = await prisma.category.count();
  const employeesCount = await prisma.user.count();
  const assetsCount = await prisma.asset.count();

  return {
    departmentsCount,
    categoriesCount,
    employeesCount,
    assetsCount
  };
};

export const getManagerStats = async () => {
  const assetsCount = await prisma.asset.count();
  const activeAllocationsCount = await prisma.assetAssignment.count({
    where: { status: 'ACTIVE' }
  });
  const maintenanceCount = await prisma.maintenanceRequest.count({
    where: { status: 'IN_PROGRESS' }
  });
  
  return {
    assetsCount,
    activeAllocationsCount,
    maintenanceCount,
    pendingTransfersCount: 0
  };
};

export const getDeptHeadStats = async (department) => {
  const dept = await prisma.department.findFirst({
    where: { name: department }
  });
  const deptId = dept ? dept.id : null;

  const deptAssetsCount = await prisma.asset.count({
    where: {
      assignments: {
        some: {
          departmentId: deptId,
          status: 'ACTIVE'
        }
      }
    }
  });

  const deptAssets = await prisma.asset.findMany({
    where: {
      assignments: {
        some: {
          departmentId: deptId,
          status: 'ACTIVE'
        }
      }
    }
  });
  const totalValue = deptAssets.reduce((sum, a) => sum + Number(a.acquisitionCost || 0), 0);

  const pendingBookings = await prisma.resourceBooking.count({
    where: {
      status: 'PENDING'
    }
  });

  return {
    deptAssetsCount,
    totalValue,
    pendingBookings,
    pendingTransfers: 0
  };
};

export const getEmployeeStats = async (userId) => {
  const myAllocatedCount = await prisma.assetAssignment.count({
    where: { employeeId: userId, status: 'ACTIVE' }
  });

  const myBookingsCount = await prisma.resourceBooking.count({
    where: { bookerId: userId }
  });

  return {
    myAllocatedCount,
    myBookingsCount,
    myRepairsCount: 0
  };
};

export default {
  getAdminStats,
  getManagerStats,
  getDeptHeadStats,
  getEmployeeStats
};
