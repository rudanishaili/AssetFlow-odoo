import reportsRepository from './reports.repository.js';

export const getAll = async () => {
  return reportsRepository.findAll();
};

export default {
  getAll,
};
