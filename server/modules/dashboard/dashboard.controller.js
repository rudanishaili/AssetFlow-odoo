import prisma from '../../src/config/db.js';
import { successResponse } from '../../common/helpers/response.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalAssets = await prisma.asset.count();
    const availableAssets = await prisma.asset.count({ where: { status: 'AVAILABLE' } });
    const allocatedAssets = await prisma.asset.count({ where: { status: 'ALLOCATED' } });
    const maintenanceAssets = await prisma.asset.count({ where: { status: 'UNDER_MAINTENANCE' } });
    
    const activeBookings = await prisma.resourceBooking.count({ where: { status: 'ONGOING' } });
    const pendingTransfers = await prisma.assetRequest.count({ where: { status: 'PENDING', requestType: 'TRANSFER' } });
    
    // Overdue returns count
    const now = new Date();
    const overdueReturns = await prisma.assetAssignment.count({
      where: {
        status: 'ACTIVE',
        expectedReturnDate: { lt: now }
      }
    });

    successResponse(res, 'Dashboard statistics loaded', {
      totalAssets,
      availableAssets,
      allocatedAssets,
      maintenanceAssets,
      activeBookings,
      pendingTransfers,
      overdueReturns
    });
  } catch (err) {
    next(err);
  }
};