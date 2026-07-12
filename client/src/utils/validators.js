export const isRequired = (val) => !val || val.trim() === '';
export const isValidEmail = (val) => /\S+@\S+\.\S+/.test(val);
export const isValidMinLength = (val, len) => val && val.length >= len;

export default {
  isRequired,
  isValidEmail,
  isValidMinLength
};
