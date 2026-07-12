import { Router } from 'express';
import * as ctrl from './audit.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();
router.use(authMiddleware);

router.post('/cycles', roleMiddleware(['ADMIN']), ctrl.addCycle);
router.post('/cycles/:cycleId/assign', roleMiddleware(['ADMIN']), ctrl.assignItems);
router.put('/items/:itemId/verify', roleMiddleware(['ADMIN', 'MANAGER']), ctrl.logVerification);
router.put('/cycles/:cycleId/close', roleMiddleware(['ADMIN']), ctrl.completeCycle);

export default router;