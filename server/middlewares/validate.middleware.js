export const validateMiddleware = (schema) => {
  return (req, res, next) => {
    // Dummy validation logic
    next();
  };
};