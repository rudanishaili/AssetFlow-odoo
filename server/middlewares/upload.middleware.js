import upload from '../src/config/multer.js';
export const uploadSingle = upload.single('file');