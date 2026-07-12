import * as allocService from './allocation.service.js';
import { successResponse } from '../../common/helpers/response.js';
import { logAction } from '../../common/helpers/auditLogger.js';

export const allocate = async (req, res, next) => {
  try {
    const { assetId, employeeId, departmentId, expectedReturnDate } = req.body;
    const alloc = await allocService.allocateAsset(assetId, employeeId, departmentId, expectedReturnDate);
    await logAction(req.user.id, 'ALLOCATE_ASSET', { assetId, employeeId }, req.ip);
    successResponse(res, 'Asset allocated successfully', alloc, 201);
  } catch (err) {
    next(err);
  }
};

export const returnFlow = async (req, res, next) => {
  try {
    const { assetId, checkInNotes } = req.body;
    const result = await allocService.returnAsset(assetId, checkInNotes);
    await logAction(req.user.id, 'RETURN_ASSET', { assetId }, req.ip);
    successResponse(res, 'Asset returned successfully', result);
  } catch (err) {
    next(err);
  }
};

export const requestTransfer = async (req, res, next) => {
  try {
    const { assetId, targetEmployeeId, targetDepartmentId, notes } = req.body;
    const request = await allocService.createTransfer(assetId, req.user.id, targetEmployeeId, targetDepartmentId, notes);
    successResponse(res, 'Transfer request submitted', request, 201);
  } catch (err) {
    next(err);
  }
};

export const handleTransfer = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { approved } = req.body;
    const updated = await allocService.processTransferRequest(requestId, approved, req.user.id);
    await logAction(req.user.id, 'PROCESS_TRANSFER', { requestId, approved }, req.ip);
    successResponse(res, `Transfer request ${approved ? 'approved' : 'rejected'}`, updated);
  } catch (err) {
    next(err);
  }
};