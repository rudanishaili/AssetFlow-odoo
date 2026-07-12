import { Router } from 'express';
import { getProfile, updateProfile } from './profile.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateProfile);

export default router;
