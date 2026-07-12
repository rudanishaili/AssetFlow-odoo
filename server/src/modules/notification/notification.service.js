import notificationRepository from './notification.repository.js';

export const getAll = async () => {
  return notificationRepository.findAll();
};

export default {
  getAll,
};
