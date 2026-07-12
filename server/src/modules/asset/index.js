import assetRoutes from './asset.routes.js';
import assetController from './asset.controller.js';
import assetService from './asset.service.js';
import assetRepository from './asset.repository.js';

export {
  assetRoutes,
  assetController,
  assetService,
  assetRepository,
};

export default {
  routes: assetRoutes,
  controller: assetController,
  service: assetService,
  repository: assetRepository,
};
