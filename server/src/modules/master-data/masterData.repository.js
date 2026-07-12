import prisma from '../../config/db.js';

export const findAll = async () => {
  const employees = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      department: true
    }
  });

  const assets = await prisma.asset.findMany({
    select: {
      category: true
    }
  });

  // Extract unique departments and categories
  const departments = [...new Set(employees.map(e => e.department).filter(Boolean))].map(name => ({ name, code: name.substring(0, 3).toUpperCase() }));
  const categories = [...new Set(assets.map(a => a.category).filter(Boolean))].map(name => ({ name, code: name.substring(0, 3).toUpperCase() }));

  return {
    employees,
    departments,
    categories
  };
};

export default {
  findAll,
};
