import { Router } from 'express';
import assetController from './asset.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, assetController.getItems);

export default router;
