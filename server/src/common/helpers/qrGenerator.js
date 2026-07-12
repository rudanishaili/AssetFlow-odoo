/**
 * Generates a QR Code image URL based on asset metadata.
 * Uses a secure external API to construct the QR code.
 * 
 * @param {string} data - String representation of the asset code or identifier
 * @param {number} size - Optional size dimensions
 * @returns {string} - URL of the generated QR code
 */
export const generateQRCodeUrl = (data, size = 150) => {
  if (!data) return '';
  const encodedData = encodeURIComponent(data);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`;
};

export default generateQRCodeUrl;
