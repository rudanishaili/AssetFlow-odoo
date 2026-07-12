import { Router } from 'express';
import allocationController from './allocation.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

// Allocation records
router.get('/', authMiddleware, allocationController.getItems);
router.post('/checkout', authMiddleware, allocationController.checkout);
router.put('/:id/return', authMiddleware, allocationController.returnAsset);

// Requests
router.get('/requests', authMiddleware, allocationController.getRequests);
router.post('/requests', authMiddleware, allocationController.createRequest);
router.put('/requests/:id/status', authMiddleware, allocationController.updateRequestStatus);

export default router;
