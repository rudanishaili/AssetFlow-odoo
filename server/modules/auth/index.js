const authRoutes = require('./auth.routes');
const authService = require('./auth.service');

module.exports = {
  routes: authRoutes,
  service: authService,
};
