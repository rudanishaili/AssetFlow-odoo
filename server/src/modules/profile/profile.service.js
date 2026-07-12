import profileRepository from './profile.repository.js';
import ApiError from '../../common/errors/ApiError.js';
import HTTP_STATUS from '../../common/constants/httpStatus.js';

export const getProfile = async (id) => {
  const profile = await profileRepository.findById(id);
  if (!profile) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Profile not found');
  }
  return profile;
};

export const updateProfile = async (id, updateData) => {
  const profile = await profileRepository.findById(id);
  if (!profile) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Profile not found');
  }
  return profileRepository.update(id, updateData);
};

export default {
  getProfile,
  updateProfile
};
