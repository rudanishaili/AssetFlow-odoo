export const getSettings = async () => {
  return {
    systemName: 'AssetFlow',
    version: '1.0.0',
    allowRegistrations: true,
    requireBookingApprovals: true,
    maintenanceGracePeriodDays: 30
  };
};

export default {
  getSettings
};
