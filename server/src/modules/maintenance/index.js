import maintenanceRoutes from './maintenance.routes.js';
import maintenanceController from './maintenance.controller.js';
import maintenanceService from './maintenance.service.js';
import maintenanceRepository from './maintenance.repository.js';

export {
  maintenanceRoutes,
  maintenanceController,
  maintenanceService,
  maintenanceRepository,
};

export default {
  routes: maintenanceRoutes,
  controller: maintenanceController,
  service: maintenanceService,
  repository: maintenanceRepository,
};
