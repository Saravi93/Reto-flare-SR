/**
 * Tests UI para Login - Data-Driven Testing
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const fs = require('fs');
const path = require('path');

// Cargar datos de prueba desde JSON
const testDataPath = path.join(__dirname, '../../data/loginTestData.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

test.describe('Login Data-Driven Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // Ejecutar tests para cada conjunto de datos del JSON
  // Esto cubre los casos requeridos:
  // - usuario válido + contraseña inválida
  // - correo con formato inválido
  // - usuario inexistente
  // - ambos campos vacíos
  for (const data of testData) {
    test(`Data-Driven: ${data.testCase}`, async ({ page }) => {
      // Ingresar datos de prueba
      await loginPage.login(data.email, data.password);

      // Validar mensaje de error esperado
      if (data.expectedError) {
        const errorMessage = await loginPage.getErrorMessage();

        // El mensaje puede variar, validar que existe un mensaje de error
        if (errorMessage) {
          // Validar que el mensaje contiene palabras clave del error esperado
          const errorLower = errorMessage.toLowerCase();
          const expectedLower = data.expectedError.toLowerCase();
          // Verificar que contiene alguna palabra clave del error esperado
          const keywords = expectedLower.split(' ').filter(word => word.length > 3);
          const hasKeyword = keywords.some(keyword => errorLower.includes(keyword));
          expect(hasKeyword || errorLower.includes('incorrect') || errorLower.includes('invalid')).toBeTruthy();
        } else {
          // Si no hay mensaje de error visible, puede ser validación HTML5
          // Verificar que el login no fue exitoso
          const isOnLoginPage = await loginPage.isOnLoginPage();
          expect(isOnLoginPage).toBeTruthy();
        }
      }

      // Verificar que no se logueó exitosamente
      const loggedInMessage = await loginPage.getLoggedInMessage();
      expect(loggedInMessage).toBeNull();
    });
  }
});

