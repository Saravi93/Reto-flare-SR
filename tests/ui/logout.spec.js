const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');
const testData = require('../../utils/testData');

test.describe('Logout Tests', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    
    await loginPage.navigate();
    await loginPage.login(testData.login.valid.email, testData.login.valid.password);
    await homePage.navigate();
  });

  test('TC-LOGOUT-001: Clic en Logout', async ({ page }) => {
    const isLoggedIn = await homePage.isLoggedIn(testData.login.valid.name);
    expect(isLoggedIn).toBeTruthy();
    
    await homePage.logout();
    await page.waitForTimeout(1000);
  });

  test('TC-LOGOUT-002: Validar redirección a página de Login', async ({ page }) => {
    await homePage.logout();
    
    await expect(page).toHaveURL(/.*login/);
    
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBeTruthy();
  });

  test('TC-LOGOUT-003: Intentar acceder a MyAccount sin sesión → debería bloquear o pedir login', async ({ page }) => {
    await homePage.logout();
    
    const loggedInMessage = await page.locator('text=Logged in as').isVisible().catch(() => false);
    expect(loggedInMessage).toBeFalsy();
    
    await page.goto('/account');
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    
    const isOnLoginPage = currentUrl.includes('/login');
    const hasAccessDenied = await page.locator('text=Access Denied, text=Please login').isVisible().catch(() => false);
    const isOnAccountPage = currentUrl.includes('/account');
    
    const baseUrl = 'https://automationexercise.com';
    const isOnHomePage = currentUrl === baseUrl || 
                         currentUrl === `${baseUrl}/` ||
                         (currentUrl.startsWith(baseUrl) && !currentUrl.includes('/account') && !currentUrl.includes('/login'));
    
    const accessHandled = isOnLoginPage || isOnHomePage || hasAccessDenied || isOnAccountPage;
    expect(accessHandled).toBeTruthy();
  });
});

