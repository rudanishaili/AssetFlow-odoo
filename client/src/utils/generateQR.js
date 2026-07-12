export const generateQRCodeUrl = (code) => {
  if (!code) return '';
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(code)}`;
};

export default generateQRCodeUrl;
