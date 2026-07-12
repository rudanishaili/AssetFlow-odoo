import { Router } from 'express';
import auditController from './audit.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, auditController.getItems);

export default router;
