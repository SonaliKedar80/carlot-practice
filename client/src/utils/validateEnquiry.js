const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s().-]+$/;

function isValidPhone(value) {
  if (!PHONE_PATTERN.test(value)) return false;
  const digits = value.replace(/\D/g, '').length;
  return digits >= 7 && digits <= 15;
}

/**
 * Returns a map of field names to error messages.
 * Phone may be blank. Name, email, and message are required.
 */
export function validateEnquiry({ name = '', email = '', phone = '', message = '' } = {}) {
  const errors = {};

  if (!String(name).trim()) {
    errors.name = 'Name is required.';
  }

  const emailText = String(email).trim();
  if (!emailText) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(emailText)) {
    errors.email = 'Enter a valid email address.';
  }

  const phoneText = String(phone).trim();
  if (phoneText && !isValidPhone(phoneText)) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!String(message).trim()) {
    errors.message = 'Message is required.';
  }

  return errors;
}
