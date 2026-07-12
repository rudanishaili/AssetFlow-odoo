import prisma from '../../config/db.js';

export const findAllByUserId = async (userId) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
};

export const create = async (data) => {
  return prisma.notification.create({
    data
  });
};

export const update = async (id, data) => {
  return prisma.notification.update({
    where: { id },
    data
  });
};

export default {
  findAllByUserId,
  create,
  update
};
