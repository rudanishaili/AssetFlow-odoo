import allocationRoutes from './allocation.routes.js';
import allocationController from './allocation.controller.js';
import allocationService from './allocation.service.js';
import allocationRepository from './allocation.repository.js';

export {
  allocationRoutes,
  allocationController,
  allocationService,
  allocationRepository,
};

export default {
  routes: allocationRoutes,
  controller: allocationController,
  service: allocationService,
  repository: allocationRepository,
};
