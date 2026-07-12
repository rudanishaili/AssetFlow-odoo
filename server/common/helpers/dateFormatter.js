const formatToISO = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr).toISOString();
};

const diffInDays = (startDate, endDate) => {
  const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

module.exports = {
  formatToISO,
  diffInDays,
};
