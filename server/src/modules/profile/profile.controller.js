import profileService from './profile.service.js';
import { sendSuccess } from '../../common/helpers/response.js';

export const getProfile = async (req, res, next) => {
  try {
    const data = await profileService.getProfile(req.user.id);
    sendSuccess(res, data, 'Profile fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const data = await profileService.updateProfile(req.user.id, req.body);
    sendSuccess(res, data, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  getProfile,
  updateProfile
};
