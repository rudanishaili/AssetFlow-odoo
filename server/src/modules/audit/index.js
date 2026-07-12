import auditRoutes from './audit.routes.js';
import auditController from './audit.controller.js';
import auditService from './audit.service.js';
import auditRepository from './audit.repository.js';

export {
  auditRoutes,
  auditController,
  auditService,
  auditRepository,
};

export default {
  routes: auditRoutes,
  controller: auditController,
  service: auditService,
  repository: auditRepository,
};
