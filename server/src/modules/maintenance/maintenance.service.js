import maintenanceRepository from './maintenance.repository.js';
import assetRepository from '../asset/asset.repository.js';
import ApiError from '../../common/errors/ApiError.js';
import HTTP_STATUS from '../../common/constants/httpStatus.js';

export const getAll = async () => {
  return maintenanceRepository.findAll();
};

export const createRequest = async (maintenanceData) => {
  const { assetId, description } = maintenanceData;

  const asset = await assetRepository.findById(assetId);
  if (!asset) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Asset not found');
  }

  // Create request
  const request = await maintenanceRepository.create({
    assetId,
    description,
    startDate: new Date(),
    status: 'SCHEDULED'
  });

  // Mark asset as MAINTENANCE status
  await assetRepository.update(assetId, {
    status: 'MAINTENANCE'
  });

  return request;
};

export const updateStatus = async (maintenanceId, updateData) => {
  const { status, cost } = updateData;

  const maintenance = await maintenanceRepository.findById(maintenanceId);
  if (!maintenance) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Maintenance log not found');
  }

  const updatedLog = await maintenanceRepository.update(maintenanceId, {
    status,
    cost: cost ? parseFloat(cost) : undefined,
    endDate: status === 'COMPLETED' ? new Date() : undefined
  });

  // If completed or cancelled, put the asset back to AVAILABLE (or whatever status is appropriate)
  if (status === 'COMPLETED' || status === 'CANCELLED') {
    await assetRepository.update(maintenance.assetId, {
      status: 'AVAILABLE'
    });
  }

  return updatedLog;
};

export default {
  getAll,
  createRequest,
  updateStatus
};
