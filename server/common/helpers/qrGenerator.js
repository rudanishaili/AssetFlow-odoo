const generateQRLink = (assetId) => {
  if (!assetId) return '';
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=assetflow-asset-${assetId}`;
};

module.exports = {
  generateQRLink,
};
