import bookingRoutes from './booking.routes.js';
import bookingController from './booking.controller.js';
import bookingService from './booking.service.js';
import bookingRepository from './booking.repository.js';

export {
  bookingRoutes,
  bookingController,
  bookingService,
  bookingRepository,
};

export default {
  routes: bookingRoutes,
  controller: bookingController,
  service: bookingService,
  repository: bookingRepository,
};
