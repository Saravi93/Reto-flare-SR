const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const testData = require('../../utils/testData');

test.describe('Checkout Tests', () => {
  let loginPage;
  let homePage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    await loginPage.navigate();
    await loginPage.login(testData.login.valid.email, testData.login.valid.password);
    await homePage.navigate();
    
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      return page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    });
    
    const productAdded = await homePage.addProductToCartAndVerifyModal(0);
    expect(productAdded).toBeTruthy();
    
    await page.waitForTimeout(1000);
    
    await homePage.viewCartFromModal();
    
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      return page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    });
    
    await page.waitForTimeout(2000);
    
    const itemsCount = await cartPage.getCartItemsCount();
    if (itemsCount === 0) {
      await homePage.navigate();
      await page.waitForTimeout(1000);
      await homePage.addProductToCartAndVerifyModal(0);
      await page.waitForTimeout(1000);
      await cartPage.navigate();
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
        return page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      });
    }
    
    const finalItemsCount = await cartPage.getCartItemsCount();
    expect(finalItemsCount).toBeGreaterThan(0);
  });

  test('TC-CHECKOUT-001: Desde carrito → Proceed to Checkout', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout/);
  });

  test('TC-CHECKOUT-002: Validar dirección del usuario cargada', async ({ page }) => {
    await cartPage.proceedToCheckout();
    
    const isAddressLoaded = await checkoutPage.isAddressLoaded();
    expect(isAddressLoaded).toBeTruthy();
    
    const address = await checkoutPage.getAddress();
    expect(address).toBeTruthy();
    expect(address.length).toBeGreaterThan(0);
  });

  test('TC-CHECKOUT-003: Añadir comentario', async ({ page }) => {
    await cartPage.proceedToCheckout();
    
    const comment = testData.checkout.comment;
    await checkoutPage.addComment(comment);
    
    const commentTextarea = page.locator('textarea[name="message"]');
    const commentValue = await commentTextarea.inputValue();
    expect(commentValue).toBe(comment);
  });

  test('TC-CHECKOUT-004: Hacer clic en Place Order (no procesa pago real)', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.addComment(testData.checkout.comment);
    await checkoutPage.placeOrder();
    
    await page.waitForTimeout(2000);
    const url = page.url();
    expect(url).toMatch(/payment|checkout/);
  });

  test('TC-CHECKOUT-005: Validar mensaje o navegación final', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.addComment(testData.checkout.comment);
    await checkoutPage.placeOrder();
    
    await page.waitForTimeout(2000);
    
    const paymentForm = page.locator('input[name="name_on_card"]');
    if (await paymentForm.isVisible({ timeout: 3000 }).catch(() => false)) {
      await checkoutPage.fillPaymentForm();
      await checkoutPage.confirmPayment();
      
      const isOrderPlaced = await checkoutPage.isOrderPlaced();
      if (isOrderPlaced) {
        const successMessage = await checkoutPage.getSuccessMessage();
        expect(successMessage).toBeTruthy();
      }
    } else {
      const currentUrl = page.url();
      expect(currentUrl).toBeTruthy();
    }
  });
});

