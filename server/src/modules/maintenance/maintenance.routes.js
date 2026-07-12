import { Router } from 'express';
import maintenanceController from './maintenance.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, maintenanceController.getItems);
router.post('/', authMiddleware, maintenanceController.create);
router.post('/diagnose', authMiddleware, maintenanceController.diagnose);
router.put('/:id/status', authMiddleware, maintenanceController.updateStatus);

export default router;
