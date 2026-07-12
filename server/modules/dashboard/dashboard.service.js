const dashboardRepository = require('./dashboard.repository');

const fetchMetrics = async () => {
  const counts = await dashboardRepository.getCounts();
  return {
    totalAssets: counts.assets,
    activeBookings: counts.bookings,
    pendingMaintenance: counts.maintenances,
    recentLogs: [
      { id: 1, action: 'Asset Laptop checked out', time: '10m ago' },
      { id: 2, action: 'Server repair scheduled', time: '2h ago' }
    ]
  };
};

module.exports = {
  fetchMetrics,
};
