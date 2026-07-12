import { Router } from 'express';
import reportsController from './reports.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, reportsController.getItems);

export default router;
