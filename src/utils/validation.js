import validator from "validator";

// Validate if a string is a valid URL
export const isValidUrl = (url) => {
  return validator.isURL(url || "", { require_protocol: true });
};

// Validate if a string is a valid email
export const isValidEmail = (email) => {
  return validator.isEmail(email || "");
};

// Validate if a string is non-empty and meets length requirements
export const isNonEmptyString = (str, minLength = 2, maxLength = 30) => {
  if (!str || typeof str !== "string") return false;
  const trimmedStr = str.trim();
  return trimmedStr.length >= minLength && trimmedStr.length <= maxLength;
};

// Validate password strength (example: at least 8 characters, one number, and one special character)
export const isStrongPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password || "");
};

// Validate if a number is within a range
export const isNumberInRange = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};