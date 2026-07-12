import allocationRepository from './allocation.repository.js';
import assetRepository from '../asset/asset.repository.js';
import ApiError from '../../common/errors/ApiError.js';
import HTTP_STATUS from '../../common/constants/httpStatus.js';

export const getAll = async () => {
  return allocationRepository.findAll();
};

export const checkoutAsset = async (checkoutData, allocatedBy) => {
  const { assetId, userId, dueDate } = checkoutData;

  const asset = await assetRepository.findById(assetId);
  if (!asset) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Asset not found');
  }

  if (asset.status !== 'AVAILABLE') {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Asset is not available for checkout');
  }

  // Create allocation
  const allocation = await allocationRepository.create({
    assetId,
    userId,
    allocatedBy,
    status: 'ACTIVE',
    dueDate: dueDate ? new Date(dueDate) : null
  });

  // Update asset status
  await assetRepository.update(assetId, {
    status: 'ALLOCATED'
  });

  return allocation;
};

export const returnAsset = async (allocationId) => {
  const allocation = await allocationRepository.findById(allocationId);
  if (!allocation) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Allocation record not found');
  }

  if (allocation.status === 'RETURNED') {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Asset has already been returned');
  }

  // Update allocation
  const updatedAllocation = await allocationRepository.update(allocationId, {
    status: 'RETURNED',
    returnedAt: new Date()
  });

  // Update asset status back to AVAILABLE
  await assetRepository.update(allocation.assetId, {
    status: 'AVAILABLE'
  });

  return updatedAllocation;
};

// Request management
export const getAllRequests = async () => {
  return allocationRepository.findAllRequests();
};

export const submitRequest = async (requestData, user) => {
  return allocationRepository.createRequest({
    userId: user.id,
    userName: user.name,
    department: user.department || 'Corporate Office',
    assetType: requestData.assetType,
    notes: requestData.notes,
    status: 'PENDING'
  });
};

export const updateRequestStatus = async (requestId, status) => {
  const request = await allocationRepository.findRequestById(requestId);
  if (!request) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Request not found');
  }

  const updatedRequest = await allocationRepository.updateRequest(requestId, {
    status
  });

  // If approved, try to automatically checkout the first available asset of that category
  if (status === 'APPROVED') {
    const assets = await assetRepository.findAll();
    const availableAsset = assets.find(
      a => a.category.toLowerCase() === request.assetType.toLowerCase() && a.status === 'AVAILABLE'
    );

    if (availableAsset) {
      await checkoutAsset({
        assetId: availableAsset.id,
        userId: request.userId
      }, 'Department Head');
    }
  }

  return updatedRequest;
};

export default {
  getAll,
  checkoutAsset,
  returnAsset,
  getAllRequests,
  submitRequest,
  updateRequestStatus
};
