import dashboardService from './dashboard.service.js';
import { sendSuccess } from '../../common/helpers/response.js';

export const getDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardData(req.user);
    sendSuccess(res, data, 'Fetched dashboard metrics successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  getDashboard
};
