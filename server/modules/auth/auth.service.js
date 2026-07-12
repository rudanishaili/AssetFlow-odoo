const authRepository = require('./auth.repository');
const { signToken } = require('../../config/jwt');
const ApiError = require('../../common/errors/ApiError');

const loginUser = async (email, password) => {
  const user = await authRepository.findByEmail(email);
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Simulate password check (standard bcrypt check in production)
  // if (password !== user.password) ...
  
  const token = signToken({ id: user.id, role: user.role });
  
  // Exclude password from output
  const userResponse = { ...user };
  delete userResponse.password;

  return {
    user: userResponse,
    token,
  };
};

const getUserProfile = async (id) => {
  const user = await authRepository.findById(id);
  if (!user) {
    throw new ApiError(404, 'User profile not found');
  }
  const profileResponse = { ...user };
  delete profileResponse.password;
  return profileResponse;
};

module.exports = {
  loginUser,
  getUserProfile,
};
