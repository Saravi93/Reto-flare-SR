const axios = require('axios');
const config = require('../utils/config');

class ProductsAPI {
  constructor() {
    this.baseURL = config.apiBaseURL;
  }

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

