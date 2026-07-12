import masterDataRoutes from './masterData.routes.js';
import masterDataController from './masterData.controller.js';
import masterDataService from './masterData.service.js';
import masterDataRepository from './masterData.repository.js';

export {
  masterDataRoutes,
  masterDataController,
  masterDataService,
  masterDataRepository,
};

export default {
  routes: masterDataRoutes,
  controller: masterDataController,
  service: masterDataService,
  repository: masterDataRepository,
};
