import * as assetService from './asset.service.js';
import { successResponse } from '../../common/helpers/response.js';
import { logAction } from '../../common/helpers/auditLogger.js';

export const createAsset = async (req, res, next) => {
  try {
    const asset = await assetService.registerAsset(req.body);
    await logAction(req.user.id, 'REGISTER_ASSET', { assetId: asset.id, tag: asset.assetTag }, req.ip);
    successResponse(res, 'Asset registered successfully', asset, 201);
  } catch (err) {
    next(err);
  }
};

export const listAssets = async (req, res, next) => {
  try {
    const list = await assetService.getAssets(req.query);
    successResponse(res, 'Asset list loaded', list);
  } catch (err) {
    next(err);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const history = await assetService.getAssetHistory(id);
    successResponse(res, 'Asset history loaded', history);
  } catch (err) {
    next(err);
  }
};