import { Router } from 'express';
import masterDataController from './masterData.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, masterDataController.getItems);

export default router;
