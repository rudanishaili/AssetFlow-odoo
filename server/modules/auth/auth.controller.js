import * as authService from './auth.service.js';
import { successResponse } from '../../common/helpers/response.js';
import { logAction } from '../../common/helpers/auditLogger.js';

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.register(name, email, password);
    await logAction(user.id, 'USER_SIGNUP', { email: user.email }, req.ip);
    successResponse(res, 'Registration successful', { user }, 201);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    await logAction(result.user.id, 'USER_LOGIN', { email: result.user.email }, req.ip);
    successResponse(res, 'Login successful', result);
  } catch (err) {
    next(err);
  }
};