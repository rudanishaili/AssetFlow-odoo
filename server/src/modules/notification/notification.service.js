import notificationRepository from './notification.repository.js';

export const getMyNotifications = async (userId) => {
  return notificationRepository.findAllByUserId(userId);
};

export const markAsRead = async (id) => {
  return notificationRepository.update(id, { read: true });
};

export default {
  getMyNotifications,
  markAsRead
};
