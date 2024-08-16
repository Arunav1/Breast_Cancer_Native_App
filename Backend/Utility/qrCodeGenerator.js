// qrCodeGenerator.js

const QRCode = require("qrcode");

const generateQRCode = async (userId) => {
  try {
    const url = `http://localhost:3000/api/patient-data/${userId}`;
    const qrCodeData = await QRCode.toDataURL(url);
    return qrCodeData; // This is the base64 encoded QR code image
  } catch (err) {
    console.error("Error generating QR code", err);
    throw err;
  }
};

module.exports = { generateQRCode };
