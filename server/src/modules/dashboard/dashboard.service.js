import dashboardRepository from './dashboard.repository.js';

export const getDashboardData = async (user) => {
  const { id, role, department } = user;

  switch (role) {
    case 'ADMIN':
      return dashboardRepository.getAdminStats();
    case 'MANAGER':
      return dashboardRepository.getManagerStats();
    case 'AUDITOR':
      return dashboardRepository.getDeptHeadStats(department || '');
    case 'EMPLOYEE':
    default:
      return dashboardRepository.getEmployeeStats(id);
  }
};

export default {
  getDashboardData
};
