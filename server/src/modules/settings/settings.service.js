import settingsRepository from './settings.repository.js';

export const getSettings = async () => {
  return settingsRepository.getSettings();
};

export default {
  getSettings
};
