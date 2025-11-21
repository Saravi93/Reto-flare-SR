/**
 * Servicio API para autenticación
 */

const axios = require('axios');
const config = require('../utils/config');

class AuthAPI {
  constructor() {
    this.baseURL = config.apiBaseURL;
  }

  /**
   * Realiza login mediante API
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Respuesta de la API
   */
  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseURL}/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response?.status || 500,
        data: error.response?.data || { message: error.message }
      };
    }
  }

  /**
   * Verifica si el usuario está autenticado
   * @param {string} token - Token de autenticación
   * @returns {Promise<Object>} Respuesta de la API
   */
  async verifyToken(token) {
    try {
      const response = await axios.get(`${this.baseURL}/verifyToken`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response?.status || 500,
        data: error.response?.data || { message: error.message }
      };
    }
  }
}

module.exports = new AuthAPI();

