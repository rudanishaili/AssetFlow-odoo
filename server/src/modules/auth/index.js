import authRoutes from './auth.routes.js';
import authController from './auth.controller.js';
import authService from './auth.service.js';
import authRepository from './auth.repository.js';

export {
  authRoutes,
  authController,
  authService,
  authRepository,
};

export default {
  routes: authRoutes,
  controller: authController,
  service: authService,
  repository: authRepository,
};
