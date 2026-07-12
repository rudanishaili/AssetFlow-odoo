import { Router } from 'express';
import notificationController from './notification.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, notificationController.getMyNotifications);
router.put('/:id/read', authMiddleware, notificationController.markRead);

export default router;
