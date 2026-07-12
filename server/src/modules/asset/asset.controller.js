import assetService from './asset.service.js';
import { sendSuccess, sendCreated } from '../../common/helpers/response.js';

export const getItems = async (req, res, next) => {
  try {
    const data = await assetService.getAll();
    sendSuccess(res, data, 'Fetched asset list successfully');
  } catch (error) {
    next(error);
  }
};

export const getDetail = async (req, res, next) => {
  try {
    const data = await assetService.getById(req.params.id);
    sendSuccess(res, data, 'Fetched asset details successfully');
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const data = await assetService.createAsset(req.body);
    sendCreated(res, data, 'Asset registered successfully');
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const data = await assetService.updateAsset(req.params.id, req.body);
    sendSuccess(res, data, 'Asset updated successfully');
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const data = await assetService.deleteAsset(req.params.id);
    sendSuccess(res, data, 'Asset removed successfully');
  } catch (error) {
    next(error);
  }
};

export default {
  getItems,
  getDetail,
  create,
  update,
  remove
};
