import allocationService from './allocation.service.js';
import { sendSuccess, sendCreated } from '../../common/helpers/response.js';

export const getItems = async (req, res, next) => {
  try {
    const data = await allocationService.getAll();
    sendSuccess(res, data, 'Fetched allocation list successfully');
  } catch (error) {
    next(error);
  }
};

export const checkout = async (req, res, next) => {
  try {
    const allocatedBy = req.user.name || 'System Manager';
    const data = await allocationService.checkoutAsset(req.body, allocatedBy);
    sendCreated(res, data, 'Asset checked out successfully');
  } catch (error) {
    next(error);
  }
};

export const returnAsset = async (req, res, next) => {
  try {
    const data = await allocationService.returnAsset(req.params.id);
    sendSuccess(res, data, 'Asset returned successfully');
  } catch (error) {
    next(error);
  }
};

// Requests
export const getRequests = async (req, res, next) => {
  try {
    const data = await allocationService.getAllRequests();
    sendSuccess(res, data, 'Fetched allocation requests successfully');
  } catch (error) {
    next(error);
  }
};

export const createRequest = async (req, res, next) => {
  try {
    const data = await allocationService.submitRequest(req.body, req.user);
    sendCreated(res, data, 'Allocation request submitted successfully');
  } catch (error) {
    next(error);
  }
};

export const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const data = await allocationService.updateRequestStatus(req.params.id, status);
    sendSuccess(res, data, `Request status updated to ${status.toLowerCase()}`);
  } catch (error) {
    next(error);
  }
};

export default {
  getItems,
  checkout,
  returnAsset,
  getRequests,
  createRequest,
  updateRequestStatus
};
