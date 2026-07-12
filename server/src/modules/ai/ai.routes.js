import { Router } from 'express';
import aiController from './ai.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, aiController.getItems);

export default router;
