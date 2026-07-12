import { Router } from 'express';
import authController from './auth.controller.js';
import { validateRegister, validateLogin } from './auth.validation.js';
import validateMiddleware from '../../middlewares/validate.middleware.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', validateMiddleware(validateRegister), authController.register);
router.post('/login', validateMiddleware(validateLogin), authController.login);
router.get('/me', authMiddleware, authController.getMe);

export default router;
