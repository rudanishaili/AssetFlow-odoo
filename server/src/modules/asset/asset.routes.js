import { Router } from 'express';
import assetController from './asset.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, assetController.getItems);
router.get('/:id', authMiddleware, assetController.getDetail);
router.post('/', authMiddleware, assetController.create);
router.put('/:id', authMiddleware, assetController.update);
router.delete('/:id', authMiddleware, assetController.remove);

export default router;
