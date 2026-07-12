import profileRepository from './profile.repository.js';

export const getAll = async () => {
  return profileRepository.findAll();
};

export default {
  getAll,
};
