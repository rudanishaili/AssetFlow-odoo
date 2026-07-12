import { Router } from 'express';
import * as ctrl from './maintenance.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();
router.use(authMiddleware);

router.post('/', ctrl.raiseRequest);
router.put('/:id', roleMiddleware(['ADMIN', 'MANAGER']), ctrl.processRequest);

export default router;