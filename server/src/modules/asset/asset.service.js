import assetRepository from './asset.repository.js';
import ApiError from '../../common/errors/ApiError.js';
import HTTP_STATUS from '../../common/constants/httpStatus.js';

export const getAll = async () => {
  return assetRepository.findAll();
};

export const getById = async (id) => {
  const asset = await assetRepository.findById(id);
  if (!asset) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Asset not found');
  }
  return asset;
};

export const createAsset = async (assetData) => {
  // Generate code if not provided
  if (!assetData.code) {
    const assets = await assetRepository.findAll();
    assetData.code = `AST-${String(assets.length + 1).padStart(4, '0')}`;
  }
  return assetRepository.create(assetData);
};

export const updateAsset = async (id, assetData) => {
  const asset = await assetRepository.findById(id);
  if (!asset) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Asset not found');
  }
  return assetRepository.update(id, assetData);
};

export const deleteAsset = async (id) => {
  const asset = await assetRepository.findById(id);
  if (!asset) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Asset not found');
  }
  return assetRepository.remove(id);
};

export default {
  getAll,
  getById,
  createAsset,
  updateAsset,
  deleteAsset
};
