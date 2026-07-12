import { ApiError } from '../common/errors/ApiError.js';
const notFoundMiddleware = (req, res, next) => {
  next(new ApiError(404, 'API Route Not Found'));
};
export default notFoundMiddleware;