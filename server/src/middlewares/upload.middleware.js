import upload from '../config/multer.js';
import ApiError from '../common/errors/ApiError.js';
import HTTP_STATUS from '../common/constants/httpStatus.js';

export const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadHandler = upload.single(fieldName);

    uploadHandler(req, res, (err) => {
      if (err) {
        return next(new ApiError(HTTP_STATUS.BAD_REQUEST, err.message));
      }
      next();
    });
  };
};

export default {
  uploadSingle,
};
