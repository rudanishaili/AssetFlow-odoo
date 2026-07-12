import prisma from '../../src/config/db.js';
import { successResponse } from '../../common/helpers/response.js';

export const getAnalytics = async (req, res, next) => {
  try {
    const departmentSummary = await prisma.user.groupBy({
      by: ['departmentId'],
      _count: { id: true }
    });
    
    const maintenanceCosts = await prisma.maintenanceRequest.aggregate({
      _sum: { cost: true }
    });

    const assetStatusDistribution = await prisma.asset.groupBy({
      by: ['status'],
      _count: { id: true }
    });

    successResponse(res, 'Reports data loaded successfully', {
      departmentSummary,
      maintenanceCosts,
      assetStatusDistribution
    });
  } catch (err) {
    next(err);
  }
};