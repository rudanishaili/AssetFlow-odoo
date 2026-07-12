import { Router } from 'express';
import { getAnalytics } from './reports.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();
router.get('/', authMiddleware, roleMiddleware(['ADMIN', 'MANAGER']), getAnalytics);

export default router;