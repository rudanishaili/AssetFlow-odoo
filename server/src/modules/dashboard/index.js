import dashboardRoutes from './dashboard.routes.js';
import dashboardController from './dashboard.controller.js';
import dashboardService from './dashboard.service.js';
import dashboardRepository from './dashboard.repository.js';

export {
  dashboardRoutes,
  dashboardController,
  dashboardService,
  dashboardRepository,
};

export default {
  routes: dashboardRoutes,
  controller: dashboardController,
  service: dashboardService,
  repository: dashboardRepository,
};
