const listCategories = async () => {
  return [
    { id: 1, name: 'Hardware' },
    { id: 2, name: 'Software' },
    { id: 3, name: 'Licenses' },
    { id: 4, name: 'Infrastructure' }
  ];
};

module.exports = {
  listCategories,
};
