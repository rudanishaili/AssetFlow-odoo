import cloudinary from '../../config/cloudinary.js';

export const uploadToCloudinary = (fileBuffer, folder = 'assetflow') => {
  return new Promise((resolve, reject) => {
    if (!cloudinary.config().cloud_name) {
      // If Cloudinary is not configured, simulate local/dev mockup upload URL
      return resolve({
        url: `https://res.cloudinary.com/demo/image/upload/sample.jpg`,
        public_id: `mock_upload_${Date.now()}`,
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};
