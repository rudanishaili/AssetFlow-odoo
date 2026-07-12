export const getPagination = (page = 1, size = 10) => {
  const limit = +size;
  const offset = (page - 1) * limit;
  return { limit, offset };
};