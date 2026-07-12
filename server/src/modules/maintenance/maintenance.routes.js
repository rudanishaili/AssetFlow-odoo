import { Router } from 'express';
import maintenanceController from './maintenance.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, maintenanceController.getItems);

export default router;
