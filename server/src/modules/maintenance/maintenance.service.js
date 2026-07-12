import maintenanceRepository from './maintenance.repository.js';

export const getAll = async () => {
  return maintenanceRepository.findAll();
};

export default {
  getAll,
};
