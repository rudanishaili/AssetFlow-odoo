import bookingRepository from './booking.repository.js';

export const getAll = async () => {
  return bookingRepository.findAll();
};

export default {
  getAll,
};
