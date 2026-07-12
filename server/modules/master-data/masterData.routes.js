import { Router } from 'express';
import * as ctrl from './masterData.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();

router.use(authMiddleware);

// Category routes - managers/admins
router.post('/categories', roleMiddleware(['ADMIN', 'MANAGER']), ctrl.addCategory);
router.get('/categories', ctrl.listCategories);

// Department routes - admins only
router.post('/departments', roleMiddleware(['ADMIN']), ctrl.addDepartment);
router.put('/departments/:id', roleMiddleware(['ADMIN']), ctrl.editDepartment);
router.get('/departments', ctrl.listDepartments);

// Employee Directory - admins promote
router.get('/employees', ctrl.listEmployees);
router.put('/employees/:employeeId/promote', roleMiddleware(['ADMIN']), ctrl.promoteUser);

export default router;