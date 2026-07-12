/**
 * Formats a Date object or timestamp into standard YYYY-MM-DD format.
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
};

/**
 * Formats a Date object or timestamp into standard human-readable date-time format.
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleString();
};

export default {
  formatDate,
  formatDateTime,
};
