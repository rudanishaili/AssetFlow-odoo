import * as maintService from './maintenance.service.js';
import { successResponse } from '../../common/helpers/response.js';
import { logAction } from '../../common/helpers/auditLogger.js';

export const raiseRequest = async (req, res, next) => {
  try {
    const { assetId, issueDescription, priority } = req.body;
    const request = await maintService.createMaintenanceRequest(assetId, issueDescription, priority, req.user.id);
    successResponse(res, 'Maintenance request raised successfully', request, 201);
  } catch (err) {
    next(err);
  }
};

export const processRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, technicianName, cost, nextMaintenanceDate } = req.body;
    const request = await maintService.updateMaintenanceStatus(id, status, req.user.id, technicianName, cost, nextMaintenanceDate);
    await logAction(req.user.id, 'MAINTENANCE_UPDATE', { id, status }, req.ip);
    successResponse(res, 'Maintenance status updated', request);
  } catch (err) {
    next(err);
  }
};