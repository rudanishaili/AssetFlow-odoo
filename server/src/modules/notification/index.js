import notificationRoutes from './notification.routes.js';
import notificationController from './notification.controller.js';
import notificationService from './notification.service.js';
import notificationRepository from './notification.repository.js';

export {
  notificationRoutes,
  notificationController,
  notificationService,
  notificationRepository,
};

export default {
  routes: notificationRoutes,
  controller: notificationController,
  service: notificationService,
  repository: notificationRepository,
};
