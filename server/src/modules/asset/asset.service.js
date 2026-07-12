import assetRepository from './asset.repository.js';

export const getAll = async () => {
  return assetRepository.findAll();
};

export default {
  getAll,
};
