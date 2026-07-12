import * as bookingService from './booking.service.js';
import { successResponse } from '../../common/helpers/response.js';

export const createBooking = async (req, res, next) => {
  try {
    const { assetId, startTime, endTime } = req.body;
    const booking = await bookingService.bookResource(assetId, req.user.id, startTime, endTime);
    successResponse(res, 'Booking slot scheduled successfully', booking, 201);
  } catch (err) {
    next(err);
  }
};

export const listBookings = async (req, res, next) => {
  try {
    const { assetId } = req.query;
    const list = await bookingService.getBookings(assetId);
    successResponse(res, 'Booking calendar data loaded', list);
  } catch (err) {
    next(err);
  }
};