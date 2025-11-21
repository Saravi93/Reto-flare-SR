const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const fs = require('fs');
const path = require('path');

const testDataPath = path.join(__dirname, '../../data/loginTestData.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

test.describe('Login Data-Driven Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  for (const data of testData) {
    test(`Data-Driven: ${data.testCase}`, async ({ page }) => {
      test.setTimeout(45000);
      
      await loginPage.login(data.email, data.password);

      await page.waitForTimeout(3000);

      const isEmptyFields = !data.email || !data.password;
      const isInvalidEmail = data.email && !data.email.includes('@');

      if (isEmptyFields || isInvalidEmail) {
        const isOnLoginPage = await loginPage.isOnLoginPage();
        expect(isOnLoginPage).toBeTruthy();
        
        const loggedInMessage = await loginPage.getLoggedInMessage();
        expect(loggedInMessage).toBeNull();
        return;
      }

      if (data.expectedError) {
        const errorMessage = await loginPage.getErrorMessage().catch(() => null);
        
        if (errorMessage) {
          const errorLower = errorMessage.toLowerCase();
          const expectedLower = data.expectedError.toLowerCase();
          const keywords = expectedLower.split(' ').filter(word => word.length > 3);
          const hasKeyword = keywords.some(keyword => errorLower.includes(keyword));
          expect(hasKeyword || errorLower.includes('incorrect') || errorLower.includes('invalid')).toBeTruthy();
        } else {
          const isOnLoginPage = await loginPage.isOnLoginPage();
          expect(isOnLoginPage).toBeTruthy();
        }
      }

      const loggedInMessage = await loginPage.getLoggedInMessage();
      expect(loggedInMessage).toBeNull();
    });
  }
});

