import { Router } from 'express';
import * as ctrl from './allocation.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();
router.use(authMiddleware);

router.post('/allocate', roleMiddleware(['ADMIN', 'MANAGER']), ctrl.allocate);
router.post('/return', roleMiddleware(['ADMIN', 'MANAGER']), ctrl.returnFlow);
router.post('/transfer-request', ctrl.requestTransfer);
router.put('/transfer-request/:requestId', roleMiddleware(['ADMIN', 'MANAGER']), ctrl.handleTransfer);

export default router;