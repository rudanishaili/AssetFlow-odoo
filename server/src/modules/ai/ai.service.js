import aiRepository from './ai.repository.js';

export const getAll = async () => {
  return aiRepository.findAll();
};

export default {
  getAll,
};
