import { Router } from 'express';
import * as ctrl from './asset.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();
router.use(authMiddleware);

router.post('/', roleMiddleware(['ADMIN', 'MANAGER']), ctrl.createAsset);
router.get('/', ctrl.listAssets);
router.get('/:id/history', ctrl.getHistory);

export default router;