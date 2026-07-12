import maintenanceService from './maintenance.service.js';
import aiService from './ai.service.js';
import { sendSuccess, sendCreated } from '../../common/helpers/response.js';

export const getItems = async (req, res, next) => {
  try {
    const data = await maintenanceService.getAll();
    sendSuccess(res, data, 'Fetched maintenance tickets successfully');
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const data = await maintenanceService.createRequest(req.body);
    sendCreated(res, data, 'Maintenance ticket submitted successfully');
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const data = await maintenanceService.updateStatus(req.params.id, req.body);
    sendSuccess(res, data, 'Maintenance status updated successfully');
  } catch (error) {
    next(error);
  }
};

export const diagnose = async (req, res, next) => {
  try {
    const data = await aiService.diagnoseIssue(req.body.description);
    sendSuccess(res, data, 'AI Smart Diagnostics generated successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  getItems,
  create,
  updateStatus,
  diagnose
};
