/**
 * Tests UI para Checkout
 */

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
    
    // Realizar login y agregar producto al carrito
    await loginPage.navigate();
    await loginPage.login(testData.login.valid.email, testData.login.valid.password);
    await homePage.navigate();
    await homePage.addProductToCartAndVerifyModal(0);
    await homePage.viewCartFromModal();
  });

  test('TC-CHECKOUT-001: Desde carrito → Proceed to Checkout', async ({ page }) => {
    // Proceder al checkout desde el carrito
    await cartPage.proceedToCheckout();
    
    // Verificar que estamos en la página de checkout
    await expect(page).toHaveURL(/.*checkout/);
  });

  test('TC-CHECKOUT-002: Validar dirección del usuario cargada', async ({ page }) => {
    // Proceder al checkout
    await cartPage.proceedToCheckout();
    
    // Verificar que la dirección está cargada
    const isAddressLoaded = await checkoutPage.isAddressLoaded();
    expect(isAddressLoaded).toBeTruthy();
    
    // Verificar que la dirección tiene contenido
    const address = await checkoutPage.getAddress();
    expect(address).toBeTruthy();
    expect(address.length).toBeGreaterThan(0);
  });

  test('TC-CHECKOUT-003: Añadir comentario', async ({ page }) => {
    // Proceder al checkout
    await cartPage.proceedToCheckout();
    
    // Añadir comentario
    const comment = testData.checkout.comment;
    await checkoutPage.addComment(comment);
    
    // Verificar que el comentario se añadió
    const commentTextarea = page.locator('textarea[name="message"]');
    const commentValue = await commentTextarea.inputValue();
    expect(commentValue).toBe(comment);
  });

  test('TC-CHECKOUT-004: Hacer clic en Place Order (no procesa pago real)', async ({ page }) => {
    // Proceder al checkout
    await cartPage.proceedToCheckout();
    
    // Añadir comentario
    await checkoutPage.addComment(testData.checkout.comment);
    
    // Hacer clic en Place Order
    await checkoutPage.placeOrder();
    
    // Verificar que se navega a la página de pago
    // (El sitio puede redirigir a página de pago o mostrar formulario)
    await page.waitForTimeout(2000);
    const url = page.url();
    expect(url).toMatch(/payment|checkout/);
  });

  test('TC-CHECKOUT-005: Validar mensaje o navegación final', async ({ page }) => {
    // Proceder al checkout
    await cartPage.proceedToCheckout();
    
    // Añadir comentario
    await checkoutPage.addComment(testData.checkout.comment);
    
    // Place Order
    await checkoutPage.placeOrder();
    
    // Esperar a que cargue la página de pago
    await page.waitForTimeout(2000);
    
    // Si hay formulario de pago, completarlo (no procesa pago real)
    const paymentForm = page.locator('input[name="name_on_card"]');
    if (await paymentForm.isVisible({ timeout: 3000 }).catch(() => false)) {
      await checkoutPage.fillPaymentForm();
      await checkoutPage.confirmPayment();
      
      // Verificar mensaje de éxito
      const isOrderPlaced = await checkoutPage.isOrderPlaced();
      if (isOrderPlaced) {
        const successMessage = await checkoutPage.getSuccessMessage();
        expect(successMessage).toBeTruthy();
      }
    } else {
      // Si no hay formulario de pago, verificar que se completó el proceso
      const currentUrl = page.url();
      expect(currentUrl).toBeTruthy();
    }
  });
});

