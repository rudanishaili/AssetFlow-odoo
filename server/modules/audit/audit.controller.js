import * as auditService from './audit.service.js';
import { successResponse } from '../../common/helpers/response.js';
import { logAction } from '../../common/helpers/auditLogger.js';

export const addCycle = async (req, res, next) => {
  try {
    const { name, scopeLocation, scopeDepartmentId, startDate, endDate } = req.body;
    const cycle = await auditService.createAuditCycle(name, scopeLocation, scopeDepartmentId, startDate, endDate);
    await logAction(req.user.id, 'CREATE_AUDIT_CYCLE', { cycleId: cycle.id, name: cycle.name }, req.ip);
    successResponse(res, 'Audit cycle created successfully', cycle, 201);
  } catch (err) {
    next(err);
  }
};

export const assignItems = async (req, res, next) => {
  try {
    const { cycleId } = req.params;
    const { assetIds, auditorId } = req.body;
    const items = await auditService.addAuditorsAndItems(cycleId, assetIds, auditorId);
    successResponse(res, 'Auditors and assets assigned to cycle', items, 201);
  } catch (err) {
    next(err);
  }
};

export const logVerification = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { status, verificationNotes } = req.body;
    const item = await auditService.verifyAuditItem(itemId, status, verificationNotes);
    successResponse(res, 'Asset verification logged', item);
  } catch (err) {
    next(err);
  }
};

export const completeCycle = async (req, res, next) => {
  try {
    const { cycleId } = req.params;
    const result = await auditService.closeCycle(cycleId, req.user.id);
    await logAction(req.user.id, 'CLOSE_AUDIT_CYCLE', { cycleId }, req.ip);
    successResponse(res, 'Audit cycle closed successfully', result);
  } catch (err) {
    next(err);
  }
};