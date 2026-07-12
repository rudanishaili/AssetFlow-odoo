import profileRoutes from './profile.routes.js';
import profileController from './profile.controller.js';
import profileService from './profile.service.js';
import profileRepository from './profile.repository.js';

export {
  profileRoutes,
  profileController,
  profileService,
  profileRepository,
};

export default {
  routes: profileRoutes,
  controller: profileController,
  service: profileService,
  repository: profileRepository,
};
