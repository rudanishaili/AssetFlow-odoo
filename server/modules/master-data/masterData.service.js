import prisma from '../../src/config/db.js';
import { ApiError } from '../../common/errors/ApiError.js';

// Departments
export const createDepartment = async (name, parentId, headId) => {
  return prisma.department.create({
    data: { name, parentId, headId }
  });
};

export const updateDepartment = async (id, name, parentId, headId, status) => {
  return prisma.department.update({
    where: { id },
    data: { name, parentId, headId, status }
  });
};

export const getDepartments = async () => {
  return prisma.department.findMany({
    include: { head: true, parent: true }
  });
};

// Categories
export const createCategory = async (name, description, customFieldSpecs) => {
  return prisma.category.create({
    data: { name, description, customFieldSpecs }
  });
};

export const getCategories = async () => {
  return prisma.category.findMany();
};

// Employee Directory & Role Promotion
export const getEmployees = async () => {
  return prisma.user.findMany({
    select: {
      id: true, name: true, email: true, role: true, status: true, createdAt: true,
      department: { select: { id: true, name: true } }
    }
  });
};

export const promoteEmployee = async (employeeId, role, departmentId) => {
  const updateData = { role };
  if (departmentId !== undefined) {
    updateData.departmentId = departmentId;
  }
  return prisma.user.update({
    where: { id: employeeId },
    data: updateData
  });
};