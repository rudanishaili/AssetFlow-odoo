/**
 * Validates signup payload data.
 */
export const validateRegister = (data) => {
  const errors = {};
  
  if (!data.email || !data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }
  
  if (!data.name || !data.name.trim()) {
    errors.name = 'Name is required';
  }

  return {
    error: Object.keys(errors).length > 0 ? errors : null,
    value: data,
  };
};

/**
 * Validates login payload data.
 */
export const validateLogin = (data) => {
  const errors = {};

  if (!data.email || !data.email.trim()) {
    errors.email = 'Email is required';
  }
  
  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    error: Object.keys(errors).length > 0 ? errors : null,
    value: data,
  };
};

export default {
  validateRegister,
  validateLogin,
};
