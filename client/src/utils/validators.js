export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validateRequired(value) {
  if (value === null || value === undefined) return false;
  return String(value).trim().length > 0;
}
