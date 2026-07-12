const authService = require('./auth.service');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await authService.getUserProfile(userId);
    res.status(200).json({
      status: 'success',
      data: { user: profile },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getProfile,
};
