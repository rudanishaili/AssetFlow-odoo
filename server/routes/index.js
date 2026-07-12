import { Router } from 'express';
import authRouter from '../modules/auth/index.js';
import dashboardRouter from '../modules/dashboard/index.js';
import masterDataRouter from '../modules/master-data/index.js';
import assetRouter from '../modules/asset/index.js';
import allocationRouter from '../modules/allocation/index.js';
import bookingRouter from '../modules/booking/index.js';
import maintenanceRouter from '../modules/maintenance/index.js';
import auditRouter from '../modules/audit/index.js';
import reportsRouter from '../modules/reports/index.js';
import notificationRouter from '../modules/notification/index.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/dashboard', dashboardRouter);
router.use('/master-data', masterDataRouter);
router.use('/assets', assetRouter);
router.use('/allocations', allocationRouter);
router.use('/bookings', bookingRouter);
router.use('/maintenance', maintenanceRouter);
router.use('/audits', auditRouter);
router.use('/reports', reportsRouter);
router.use('/notifications', notificationRouter);

export default router;