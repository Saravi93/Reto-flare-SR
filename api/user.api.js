const axios = require('axios');
const config = require('../utils/config');

class UserAPI {
  constructor() {
    this.baseURL = config.apiBaseURL;
  }

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

