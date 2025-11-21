/**
 * Tests UI para Login
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');
const testData = require('../../utils/testData');
const config = require('../../utils/config');

test.describe('Login Tests', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.navigate();
  });

  test('TC-AUTH-001: Login exitoso', async ({ page }) => {
    // Navegar a Signup/Login
    await loginPage.navigate();
    
    // Ingresar correo y contraseña válidos
    const userData = testData.login.valid;
    await loginPage.login(userData.email, userData.password);
    
    // Validar saludo "Logged in as {user name}"
    const loggedInMessage = await loginPage.getLoggedInMessage();
    expect(loggedInMessage).toContain('Logged in as');
    
    // Verificar que el usuario está logueado
    const isLoggedIn = await loginPage.isLoggedIn(userData.name);
    expect(isLoggedIn).toBeTruthy();
  });

  test('TC-AUTH-002: Login fallido por contraseña incorrecta', async ({ page }) => {
    // Ingresar correo válido y contraseña incorrecta
    const userData = testData.login.invalidPassword;
    await loginPage.login(userData.email, userData.password);
    
    // Verificar que los mensajes de error aparezcan correctamente
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.messages.login.error);
    
    // Verificar que permanece en la página de login
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBeTruthy();
  });

  test('TC-AUTH-003: Login fallido por usuario inexistente', async ({ page }) => {
    // Ingresar usuario inexistente
    const userData = testData.login.invalidUser;
    await loginPage.login(userData.email, userData.password);
    
    // Verificar mensaje de error
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(testData.messages.login.error);
    
    // Verificar que permanece en la página de login
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBeTruthy();
  });

  test('TC-AUTH-004: Verificar que los mensajes de error aparezcan correctamente', async ({ page }) => {
    // Probar login con contraseña incorrecta
    await loginPage.login(testData.login.valid.email, testData.login.invalidPassword.password);
    let errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
    expect(errorMessage).toContain('incorrect');
    
    // Limpiar y probar con usuario inexistente
    await loginPage.navigate();
    await loginPage.login(testData.login.invalidUser.email, testData.login.invalidUser.password);
    errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
    expect(errorMessage).toContain('incorrect');
  });
});

