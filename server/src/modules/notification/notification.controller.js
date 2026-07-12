import notificationService from './notification.service.js';
import { sendSuccess } from '../../common/helpers/response.js';

export const getMyNotifications = async (req, res, next) => {
  try {
    const data = await notificationService.getMyNotifications(req.user.id);
    sendSuccess(res, data, 'Fetched notifications successfully');
  } catch (error) {
    next(error);
  }
};

export const markRead = async (req, res, next) => {
  try {
    const data = await notificationService.markAsRead(req.params.id);
    sendSuccess(res, data, 'Notification marked as read');
  } catch (error) {
    next(error);
  }
};

export default {
  getMyNotifications,
  markRead
};
