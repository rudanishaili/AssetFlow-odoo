export function generateQR(value) {
  // Returns a mock QR code image link using standard visual charts API
  if (!value) return '';
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(value)}`;
}
