import settingsRoutes from './settings.routes.js';
import settingsController from './settings.controller.js';
import settingsService from './settings.service.js';
import settingsRepository from './settings.repository.js';

export {
  settingsRoutes,
  settingsController,
  settingsService,
  settingsRepository,
};

export default {
  routes: settingsRoutes,
  controller: settingsController,
  service: settingsService,
  repository: settingsRepository,
};
