const masterDataService = require('./masterData.service');

const getCategories = async (req, res, next) => {
  try {
    const categories = await masterDataService.fetchCategories();
    res.status(200).json({
      status: 'success',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
};
