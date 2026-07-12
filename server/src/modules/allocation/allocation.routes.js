import { Router } from 'express';
import allocationController from './allocation.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, allocationController.getItems);

export default router;
