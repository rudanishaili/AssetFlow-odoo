const cloudinary = require('../../config/cloudinary');

const uploadToCloudinary = async (filePath, folder = 'assetflow') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      use_filename: true,
      unique_filename: true,
    });
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

module.exports = {
  uploadToCloudinary,
};
