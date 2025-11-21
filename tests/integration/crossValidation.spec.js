/**
 * Tests de Integración - Validación Cruzada UI + API
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');
const userAPI = require('../../api/user.api');
const testData = require('../../utils/testData');

test.describe('Cross Validation UI + API Tests', () => {
  test('TC-INTEGRATION-001: Validación cruzada - Login UI y validar con API', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    
    // 1. Hacer login por UI
    await loginPage.navigate();
    const userData = testData.login.valid;
    await loginPage.login(userData.email, userData.password);
    
    // 2. Capturar nombre del usuario en UI
    const loggedInMessage = await loginPage.getLoggedInMessage();
    expect(loggedInMessage).toBeTruthy();
    expect(loggedInMessage).toContain('Logged in as');
    
    // Extraer el nombre del usuario del mensaje
    const userNameMatch = loggedInMessage.match(/Logged in as (.+)/);
    const userNameFromUI = userNameMatch ? userNameMatch[1].trim() : null;
    
    // 3. Validar contra valor retornado por /getUserDetailByEmail
    const apiResponse = await userAPI.getUserDetailByEmail(userData.email);
    
    expect(apiResponse.status).toBe(200);
    expect(apiResponse.data).toBeTruthy();
    
    // Verificar que los datos coinciden
    if (apiResponse.data.user) {
      const apiUser = apiResponse.data.user;
      // El nombre en la API puede estar en diferentes campos
      const apiUserName = apiUser.name || apiUser.username || apiUser.firstname;
      
      if (userNameFromUI && apiUserName) {
        // Comparar nombres (pueden tener diferencias de formato)
        expect(userNameFromUI.toLowerCase()).toContain(apiUserName.toLowerCase().split(' ')[0]);
      }
    } else if (apiResponse.data.name) {
      // Si la respuesta tiene name directamente
      const apiName = apiResponse.data.name;
      if (userNameFromUI) {
        expect(userNameFromUI.toLowerCase()).toContain(apiName.toLowerCase().split(' ')[0]);
      }
    }
    
    // Verificar que el email coincide
    if (apiResponse.data.user && apiResponse.data.user.email) {
      expect(apiResponse.data.user.email).toBe(userData.email);
    } else if (apiResponse.data.email) {
      expect(apiResponse.data.email).toBe(userData.email);
    }
  });
});

