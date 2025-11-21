/**
 * Funciones auxiliares y helpers
 */

/**
 * Espera un tiempo determinado
 * @param {number} ms - Milisegundos a esperar
 */
const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Genera un email único basado en timestamp
 * @returns {string} Email único
 */
const generateUniqueEmail = () => {
  return `test${Date.now()}@example.com`;
};

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Formatea fecha para inputs de tipo date
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha en formato YYYY-MM-DD
 */
const formatDateForInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Obtiene fecha hace N días
 * @param {number} daysAgo - Número de días atrás
 * @returns {Date} Fecha calculada
 */
const getDateDaysAgo = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

/**
 * Valida que un número esté dentro de un rango
 * @param {number} value - Valor a validar
 * @param {number} min - Mínimo
 * @param {number} max - Máximo
 * @returns {boolean} True si está en rango
 */
const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

/**
 * Extrae número de un string (ej: "Rs. 500" -> 500)
 * @param {string} str - String con número
 * @returns {number} Número extraído
 */
const extractNumber = (str) => {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

/**
 * Valida estructura de respuesta API
 * @param {Object} response - Respuesta de API
 * @param {Array} requiredFields - Campos requeridos
 * @returns {boolean} True si tiene todos los campos
 */
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

