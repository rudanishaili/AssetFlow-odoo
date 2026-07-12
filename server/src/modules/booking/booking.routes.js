import { Router } from 'express';
import bookingController from './booking.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, bookingController.getItems);

export default router;
