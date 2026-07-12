const validateCategory = (body) => {
  if (!body.name) {
    return { error: new Error('Category name is required.') };
  }
  return { value: body };
};

module.exports = {
  validateCategory,
};
