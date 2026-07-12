import { Router } from 'express';
import settingsController from './settings.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, settingsController.getItems);

export default router;
