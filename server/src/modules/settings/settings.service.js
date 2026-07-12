import settingsRepository from './settings.repository.js';

export const getAll = async () => {
  return settingsRepository.findAll();
};

export default {
  getAll,
};
