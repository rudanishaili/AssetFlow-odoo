import prisma from '../../config/db.js';

export const findById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      department: true,
      createdAt: true
    }
  });
};

export const update = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      department: true,
      createdAt: true
    }
  });
};

export default {
  findById,
  update
};
