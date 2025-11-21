/**
 * Servicio API para usuarios
 */

const axios = require('axios');
const config = require('../utils/config');

class UserAPI {
  constructor() {
    this.baseURL = config.apiBaseURL;
  }

  /**
   * Crea una nueva cuenta de usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<Object>} Respuesta de la API
   */
  async createAccount(userData) {
    try {
      const response = await axios.post(`${this.baseURL}/createAccount`, userData, {
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
   * Obtiene detalles de usuario por email
   * @param {string} email - Email del usuario
   * @returns {Promise<Object>} Respuesta con detalles del usuario
   */
  async getUserDetailByEmail(email) {
    try {
      const response = await axios.get(`${this.baseURL}/getUserDetailByEmail`, {
        params: {
          email: email
        },
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
   * Actualiza cuenta de usuario
   * @param {Object} userData - Datos actualizados del usuario
   * @returns {Promise<Object>} Respuesta de la API
   */
  async updateAccount(userData) {
    try {
      const response = await axios.put(`${this.baseURL}/updateAccount`, userData, {
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
   * Elimina cuenta de usuario
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} Respuesta de la API
   */
  async deleteAccount(email, password) {
    try {
      const response = await axios.delete(`${this.baseURL}/deleteAccount`, {
        data: {
          email,
          password
        },
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
}

module.exports = new UserAPI();

