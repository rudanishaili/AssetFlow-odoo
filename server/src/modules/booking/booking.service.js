import bookingRepository from './booking.repository.js';
import assetRepository from '../asset/asset.repository.js';
import ApiError from '../../common/errors/ApiError.js';
import HTTP_STATUS from '../../common/constants/httpStatus.js';

export const getAll = async () => {
  return bookingRepository.findAll();
};

export const createBooking = async (bookingData, userId) => {
  const { assetId, startDate, endDate, purpose } = bookingData;

  const asset = await assetRepository.findById(assetId);
  if (!asset) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Asset not found');
  }

  // Create booking
  return bookingRepository.create({
    assetId,
    userId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    purpose,
    status: 'PENDING'
  });
};

export const updateStatus = async (bookingId, status) => {
  const booking = await bookingRepository.findById(bookingId);
  if (!booking) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Booking not found');
  }

  const updatedBooking = await bookingRepository.update(bookingId, {
    status
  });

  // If approved, optionally lock the asset status to RESERVED
  if (status === 'APPROVED') {
    await assetRepository.update(booking.assetId, {
      status: 'RESERVED'
    });
  } else if (status === 'REJECTED' || status === 'CANCELLED') {
    await assetRepository.update(booking.assetId, {
      status: 'AVAILABLE'
    });
  }

  return updatedBooking;
};

export default {
  getAll,
  createBooking,
  updateStatus
};
