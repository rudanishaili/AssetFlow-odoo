import auditRepository from './audit.repository.js';

export const getAll = async () => {
  return auditRepository.findAll();
};

export default {
  getAll,
};
