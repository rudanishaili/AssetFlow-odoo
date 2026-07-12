import masterDataRepository from './masterData.repository.js';

export const getAll = async () => {
  return masterDataRepository.findAll();
};

export default {
  getAll,
};
