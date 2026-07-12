import authService from './auth.service.js';
import { sendSuccess, sendCreated } from '../../common/helpers/response.js';

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    sendCreated(res, result, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    sendSuccess(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const result = await authService.getMe(req.user.id);
    sendSuccess(res, result, 'User profile fetched successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getMe,
};
