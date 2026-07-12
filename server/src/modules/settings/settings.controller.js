import settingsService from './settings.service.js';
import { sendSuccess } from '../../common/helpers/response.js';

export const getItems = async (req, res, next) => {
  try {
    const data = await settingsService.getAll();
    sendSuccess(res, data, 'Fetched  list successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  getItems,
};
