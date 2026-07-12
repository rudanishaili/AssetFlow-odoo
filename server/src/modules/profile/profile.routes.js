import { Router } from 'express';
import profileController from './profile.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, profileController.getItems);

export default router;
