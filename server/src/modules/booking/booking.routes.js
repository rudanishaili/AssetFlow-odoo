import { Router } from 'express';
import bookingController from './booking.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, bookingController.getItems);
router.post('/', authMiddleware, bookingController.create);
router.put('/:id/status', authMiddleware, bookingController.updateStatus);

export default router;
