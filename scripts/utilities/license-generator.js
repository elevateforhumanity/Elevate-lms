// license-generator.js
const crypto = require('crypto');

const LICENSE_SECRET = process.env.LICENSE_SECRET || 'elevateSuperSecretKey';

function generateLicense(email, productId, expiresInDays = 365) {
  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt);
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  const payload = `${email}|${productId}|${issuedAt.toISOString()}|${expiresAt.toISOString()}`;

  const hash = crypto
    .createHmac('sha256', LICENSE_SECRET)
    .update(payload)
    .digest('hex');

  const licenseKey = Buffer.from(payload).toString('base64') + '.' + hash;
  return { licenseKey, expiresAt };
}

function validateLicense(licenseKey) {
  try {
    const [encodedPayload, signature] = licenseKey.split('.');
    const payload = Buffer.from(encodedPayload, 'base64').toString('utf-8');
    const hashCheck = crypto
      .createHmac('sha256', LICENSE_SECRET)
      .update(payload)
      .digest('hex');

    if (hashCheck !== signature)
      return { valid: false, reason: 'Invalid signature' };

    const [email, productId, issuedAt, expiresAt] = payload.split('|');
    const now = new Date();
    if (now > new Date(expiresAt)) return { valid: false, reason: 'Expired' };

    return { valid: true, email, productId, issuedAt, expiresAt };
  } catch (err) {
    return { valid: false, reason: 'Malformed license' };
  }
}

module.exports = { generateLicense, validateLicense };
