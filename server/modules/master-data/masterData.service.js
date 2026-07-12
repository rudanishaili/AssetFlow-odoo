const masterDataRepository = require('./masterData.repository');

const fetchCategories = async () => {
  return await masterDataRepository.listCategories();
};

module.exports = {
  fetchCategories,
};
