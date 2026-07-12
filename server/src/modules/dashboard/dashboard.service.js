import dashboardRepository from './dashboard.repository.js';

export const getAll = async () => {
  return dashboardRepository.findAll();
};

export default {
  getAll,
};
