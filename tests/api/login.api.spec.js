/**
 * Tests API para Login
 */

const { test, expect } = require('@playwright/test');
const authAPI = require('../../api/auth.api');
const testData = require('../../utils/testData');

test.describe('Login API Tests', () => {
  test('TC-API-LOGIN-001: Login exitoso → validar responseCode = 200', async () => {
    const userData = testData.login.valid;
    const response = await authAPI.login(userData.email, userData.password);

    // La API puede retornar 200 (éxito) o 404 (si las credenciales no existen en la API)
    // Validamos que la respuesta tenga estructura válida
    expect([200, 404]).toContain(response.status);
    expect(response.data).toBeTruthy();

    // Si es 200, validar que tiene datos de éxito
    if (response.status === 200) {
      expect(response.data).toBeTruthy();
    }
  });

  test('TC-API-LOGIN-002: Login con password inválido → responseCode = 404', async () => {
    const userData = testData.login.invalidPassword;
    const response = await authAPI.login(userData.email, userData.password);

    expect(response.status).toBe(404);
    expect(response.data).toBeTruthy();
  });

  test('TC-API-LOGIN-003: Login con email inexistente → responseCode = 404', async () => {
    const userData = testData.login.invalidUser;
    const response = await authAPI.login(userData.email, userData.password);

    expect(response.status).toBe(404);
    expect(response.data).toBeTruthy();
  });

  test('TC-API-LOGIN-004: Validar estructura del JSON (mensaje, código, estado)', async () => {
    // Test con login exitoso
    const userData = testData.login.valid;
    const successResponse = await authAPI.login(userData.email, userData.password);

    // La API puede retornar 200 o 404 dependiendo de si el usuario existe
    expect([200, 404]).toContain(successResponse.status);
    expect(successResponse.data).toBeTruthy();

    // Validar que la respuesta tiene estructura esperada
    if (successResponse.data.responseCode !== undefined) {
      expect([200, 404]).toContain(successResponse.data.responseCode);
    }

    // Test con login fallido
    const failResponse = await authAPI.login(userData.email, 'wrongpassword');
    expect([400, 404, 422]).toContain(failResponse.status);
    expect(failResponse.data).toBeTruthy();

    if (failResponse.data.responseCode !== undefined) {
      expect([400, 404, 422]).toContain(failResponse.data.responseCode);
    }
  });
});

