import { Router } from 'express';
import * as ctrl from './notification.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();
router.use(authMiddleware);

router.get('/', ctrl.getMyNotifications);
router.put('/:id/read', ctrl.markAsRead);

export default router;