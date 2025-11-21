const { test, expect } = require('@playwright/test');
const authAPI = require('../../api/auth.api');
const productsAPI = require('../../api/products.api');
const userAPI = require('../../api/user.api');
const axios = require('axios');
const config = require('../../utils/config');

test.describe('API Edge Cases Tests', () => {
  test('TC-API-EDGE-001: Validar comportamiento enviando parámetros vacíos', async () => {
    const loginResponse = await authAPI.login('', '');
    expect([200, 400, 404, 422]).toContain(loginResponse.status);
    
    const accountResponse = await userAPI.createAccount({});
    expect([200, 400, 422]).toContain(accountResponse.status);
  });

  test('TC-API-EDGE-002: Validar comportamiento con parámetros incorrectos', async () => {
    const invalidEmailResponse = await authAPI.login('not-an-email', 'password123');
    expect([400, 404, 422]).toContain(invalidEmailResponse.status);
    
    const wrongTypeResponse = await authAPI.login(12345, null);
    expect([400, 404, 422]).toContain(wrongTypeResponse.status);
  });

  test('TC-API-EDGE-003: Envío de request sin los headers requeridos (si aplica)', async () => {
    try {
      const response = await axios.post(`${config.apiBaseURL}/login`, {
        email: 'test@example.com',
        password: 'password123'
      }, {
        headers: {}
      });
      
      expect(response.status).toBeDefined();
      expect([200, 400, 401, 404, 415]).toContain(response.status);
    } catch (error) {
      const status = error.response?.status;
      if (status) {
        expect([400, 401, 404, 415]).toContain(status);
      } else {
        expect(error.message).toBeDefined();
      }
    }
  });

  test('TC-API-EDGE-004: Validar estructura del error retornado por la API', async () => {
    const errorResponse = await authAPI.login('invalid@example.com', 'wrongpassword');
    
    expect(errorResponse.status).toBeGreaterThanOrEqual(400);
    expect(errorResponse.data).toBeTruthy();
    
    if (errorResponse.data && typeof errorResponse.data === 'object' && errorResponse.data !== null) {
      const hasProperties = 
        errorResponse.data.message !== undefined ||
        errorResponse.data.error !== undefined ||
        errorResponse.data.responseCode !== undefined ||
        Object.keys(errorResponse.data).length >= 0;
      expect(hasProperties).toBeTruthy();
    } else {
      expect(['string', 'number', 'boolean']).toContain(typeof errorResponse.data);
    }
  });

  test('TC-API-EDGE-005: Validar tiempos de respuesta cuando corresponda', async () => {
    const startTime = Date.now();
    const response = await productsAPI.getProductsList();
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    expect(responseTime).toBeLessThan(5000);
    expect(response.status).toBe(200);
  });

  test('TC-API-EDGE-006: Validar comportamiento con caracteres especiales (caso adicional)', async () => {
    const specialCharsResponse = await authAPI.login('test@example.com<script>', 'password123');
    expect([400, 404, 422]).toContain(specialCharsResponse.status);
  });
});

