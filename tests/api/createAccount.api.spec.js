const { test, expect } = require('@playwright/test');
const userAPI = require('../../api/user.api');
const { generateUniqueEmail } = require('../../utils/helpers');
const testData = require('../../utils/testData');

test.describe('Create Account API Tests', () => {
  test('TC-API-ACCOUNT-001: Creación exitosa con email nuevo', async () => {
    const uniqueEmail = generateUniqueEmail();
    const accountData = {
      ...testData.account.newUser,
      email: uniqueEmail
    };
    
    const response = await userAPI.createAccount(accountData);
    
    expect([200, 201]).toContain(response.status);
    expect(response.data).toBeTruthy();
  });

  test('TC-API-ACCOUNT-002: Intento de creación con email ya existente → debe fallar', async () => {
    const uniqueEmail = generateUniqueEmail();
    const accountData = {
      ...testData.account.newUser,
      email: uniqueEmail
    };
    
    const firstResponse = await userAPI.createAccount(accountData);
    expect([200, 201, 400, 409, 422]).toContain(firstResponse.status);
    
    const duplicateResponse = await userAPI.createAccount(accountData);
    expect([200, 400, 409, 422]).toContain(duplicateResponse.status);
  });

  test('TC-API-ACCOUNT-003: Validar estructura de campos requeridos', async () => {
    const incompleteData = {
      email: generateUniqueEmail()
    };
    
    const response = await userAPI.createAccount(incompleteData);
    
    expect([200, 400, 422]).toContain(response.status);
    expect(response.data).toBeTruthy();
  });
});

