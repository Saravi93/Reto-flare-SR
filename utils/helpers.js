const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const generateUniqueEmail = () => {
  return `test${Date.now()}@example.com`;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const formatDateForInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDateDaysAgo = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

const extractNumber = (str) => {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

const validateAPIResponse = (response, requiredFields) => {
  if (!response || typeof response !== 'object') {
    return false;
  }
  return requiredFields.every(field => field in response);
};

module.exports = {
  wait,
  generateUniqueEmail,
  isValidEmail,
  formatDateForInput,
  getDateDaysAgo,
  isInRange,
  extractNumber,
  validateAPIResponse
};

