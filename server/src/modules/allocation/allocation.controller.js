import allocationService from './allocation.service.js';
import { sendSuccess } from '../../common/helpers/response.js';

export const getItems = async (req, res, next) => {
  try {
    const data = await allocationService.getAll();
    sendSuccess(res, data, 'Fetched  list successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  getItems,
};
