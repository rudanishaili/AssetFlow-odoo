import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import dashboardRoutes from '../modules/dashboard/dashboard.routes.js';
import masterDataRoutes from '../modules/master-data/masterData.routes.js';
import assetRoutes from '../modules/asset/asset.routes.js';
import allocationRoutes from '../modules/allocation/allocation.routes.js';
import bookingRoutes from '../modules/booking/booking.routes.js';
import maintenanceRoutes from '../modules/maintenance/maintenance.routes.js';
import auditRoutes from '../modules/audit/audit.routes.js';
import reportsRoutes from '../modules/reports/reports.routes.js';
import notificationRoutes from '../modules/notification/notification.routes.js';
import profileRoutes from '../modules/profile/profile.routes.js';
import settingsRoutes from '../modules/settings/settings.routes.js';
import aiRoutes from '../modules/ai/ai.routes.js';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/master-data', masterDataRoutes);
router.use('/asset', assetRoutes);
router.use('/allocation', allocationRoutes);
router.use('/booking', bookingRoutes);
router.use('/maintenance', maintenanceRoutes);
router.use('/audit', auditRoutes);
router.use('/reports', reportsRoutes);
router.use('/notification', notificationRoutes);
router.use('/profile', profileRoutes);
router.use('/settings', settingsRoutes);
router.use('/ai', aiRoutes);

export default router;
