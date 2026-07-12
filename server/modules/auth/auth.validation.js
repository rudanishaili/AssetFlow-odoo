// Mock validator schema template
const loginSchema = {
  validate: (body) => {
    if (!body.email || !body.password) {
      return { error: new Error('Email and password are required.') };
    }
    return { value: body };
  }
};

module.exports = {
  loginSchema,
};
