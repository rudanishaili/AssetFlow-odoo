import auditService from './audit.service.js';
import { sendSuccess } from '../../common/helpers/response.js';

export const getItems = async (req, res, next) => {
  try {
    const data = await auditService.getAll();
    sendSuccess(res, data, 'Fetched  list successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  getItems,
};
