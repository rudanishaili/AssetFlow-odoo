const upload = require('../config/multer');
const ApiError = require('../common/errors/ApiError');

const handleUpload = (fieldName) => (req, res, next) => {
  const uploadSingle = upload.single(fieldName);

  uploadSingle(req, res, (err) => {
    if (err) {
      return next(new ApiError(400, err.message));
    }
    next();
  });
};

module.exports = {
  handleUpload,
};
