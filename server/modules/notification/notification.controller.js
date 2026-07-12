import prisma from '../../src/config/db.js';
import { successResponse } from '../../common/helpers/response.js';

export const getMyNotifications = async (req, res, next) => {
  try {
    const list = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    successResponse(res, 'Notifications loaded', list);
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });
    successResponse(res, 'Notification marked as read');
  } catch (err) {
    next(err);
  }
};