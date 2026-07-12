import { Router } from 'express';
import * as ctrl from './booking.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();
router.use(authMiddleware);

router.post('/', ctrl.createBooking);
router.get('/', ctrl.listBookings);

export default router;