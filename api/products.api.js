/**
 * Servicio API para productos
 */

const axios = require('axios');
const config = require('../utils/config');

class ProductsAPI {
  constructor() {
    this.baseURL = config.apiBaseURL;
  }

  /**
   * Obtiene la lista de productos
   * @returns {Promise<Object>} Respuesta con lista de productos
   */
  async getProductsList() {
    try {
      const response = await axios.get(`${this.baseURL}/productsList`, {
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
   * Obtiene detalles de un producto por ID
   * @param {number} productId - ID del producto
   * @returns {Promise<Object>} Respuesta con detalles del producto
   */
  async getProductById(productId) {
    try {
      const response = await axios.get(`${this.baseURL}/getProductDetails`, {
        params: {
          id: productId
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
   * Busca productos
   * @param {string} searchProduct - Término de búsqueda
   * @returns {Promise<Object>} Respuesta con productos encontrados
   */
  async searchProduct(searchProduct) {
    try {
      const response = await axios.post(`${this.baseURL}/searchProduct`, {
        search_product: searchProduct
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
}

module.exports = new ProductsAPI();

