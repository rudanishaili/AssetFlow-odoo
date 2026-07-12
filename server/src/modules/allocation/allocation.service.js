import allocationRepository from './allocation.repository.js';

export const getAll = async () => {
  return allocationRepository.findAll();
};

export default {
  getAll,
};
