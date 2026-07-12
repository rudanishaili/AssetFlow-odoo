import aiRoutes from './ai.routes.js';
import aiController from './ai.controller.js';
import aiService from './ai.service.js';
import aiRepository from './ai.repository.js';

export {
  aiRoutes,
  aiController,
  aiService,
  aiRepository,
};

export default {
  routes: aiRoutes,
  controller: aiController,
  service: aiService,
  repository: aiRepository,
};
