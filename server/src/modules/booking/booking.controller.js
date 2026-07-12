import bookingService from './booking.service.js';
import { sendSuccess, sendCreated } from '../../common/helpers/response.js';

export const getItems = async (req, res, next) => {
  try {
    const data = await bookingService.getAll();
    sendSuccess(res, data, 'Fetched bookings successfully');
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const data = await bookingService.createBooking(req.body, req.user.id);
    sendCreated(res, data, 'Booking request submitted successfully');
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const data = await bookingService.updateStatus(req.params.id, status);
    sendSuccess(res, data, `Booking reservation ${status.toLowerCase()} successfully`);
  } catch (error) {
    next(error);
  }
};

export default {
  getItems,
  create,
  updateStatus
};
