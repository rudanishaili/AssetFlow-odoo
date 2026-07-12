import reportsRoutes from './reports.routes.js';
import reportsController from './reports.controller.js';
import reportsService from './reports.service.js';
import reportsRepository from './reports.repository.js';

export {
  reportsRoutes,
  reportsController,
  reportsService,
  reportsRepository,
};

export default {
  routes: reportsRoutes,
  controller: reportsController,
  service: reportsService,
  repository: reportsRepository,
};
