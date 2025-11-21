const axios = require('axios');
const config = require('../utils/config');

class AuthAPI {
  constructor() {
    this.baseURL = config.apiBaseURL;
  }

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

