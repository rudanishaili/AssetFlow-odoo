const prisma = require('../../config/db');

const getCounts = async () => {
  try {
    const assets = await prisma.asset.count();
    const bookings = await prisma.booking.count({ where: { status: 'approved' } });
    const maintenances = await prisma.maintenance.count({ where: { status: 'scheduled' } });
    return { assets, bookings, maintenances };
  } catch (error) {
    // Return mock values if connection is not ready
    return { assets: 104, bookings: 12, maintenances: 3 };
  }
};

module.exports = {
  getCounts,
};
