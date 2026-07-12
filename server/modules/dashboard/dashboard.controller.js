const dashboardService = require('./dashboard.service');

const getMetrics = async (req, res, next) => {
  try {
    const metrics = await dashboardService.fetchMetrics();
    res.status(200).json({
      status: 'success',
      data: metrics,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMetrics,
};
