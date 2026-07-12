import * as mdService from './masterData.service.js';
import { successResponse } from '../../common/helpers/response.js';
import { logAction } from '../../common/helpers/auditLogger.js';

export const addDepartment = async (req, res, next) => {
  try {
    const { name, parentId, headId } = req.body;
    const dept = await mdService.createDepartment(name, parentId, headId);
    await logAction(req.user.id, 'CREATE_DEPARTMENT', { departmentId: dept.id, name: dept.name }, req.ip);
    successResponse(res, 'Department created successfully', dept, 201);
  } catch (err) {
    next(err);
  }
};

export const editDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, parentId, headId, status } = req.body;
    const dept = await mdService.updateDepartment(id, name, parentId, headId, status);
    await logAction(req.user.id, 'UPDATE_DEPARTMENT', { departmentId: dept.id }, req.ip);
    successResponse(res, 'Department updated successfully', dept);
  } catch (err) {
    next(err);
  }
};

export const listDepartments = async (req, res, next) => {
  try {
    const list = await mdService.getDepartments();
    successResponse(res, 'Departments list loaded', list);
  } catch (err) {
    next(err);
  }
};

export const addCategory = async (req, res, next) => {
  try {
    const { name, description, customFieldSpecs } = req.body;
    const cat = await mdService.createCategory(name, description, customFieldSpecs);
    await logAction(req.user.id, 'CREATE_CATEGORY', { categoryId: cat.id, name: cat.name }, req.ip);
    successResponse(res, 'Category created successfully', cat, 201);
  } catch (err) {
    next(err);
  }
};

export const listCategories = async (req, res, next) => {
  try {
    const list = await mdService.getCategories();
    successResponse(res, 'Categories loaded', list);
  } catch (err) {
    next(err);
  }
};

export const listEmployees = async (req, res, next) => {
  try {
    const list = await mdService.getEmployees();
    successResponse(res, 'Employee directory loaded', list);
  } catch (err) {
    next(err);
  }
};

export const promoteUser = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { role, departmentId } = req.body;
    const updatedUser = await mdService.promoteEmployee(employeeId, role, departmentId);
    await logAction(req.user.id, 'PROMOTE_EMPLOYEE', { employeeId, role }, req.ip);
    successResponse(res, 'Employee profile updated successfully', updatedUser);
  } catch (err) {
    next(err);
  }
};