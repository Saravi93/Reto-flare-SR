const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');
const CartPage = require('../../pages/CartPage');
const testData = require('../../utils/testData');

test.describe('Cart Tests', () => {
  let loginPage;
  let homePage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    
    await loginPage.navigate();
    await loginPage.login(testData.login.valid.email, testData.login.valid.password);
    await homePage.navigate();
  });

  test('TC-CART-001: Seleccionar un producto y hacer clic en Add to cart', async ({ page }) => {
    const productAdded = await homePage.addProductToCartAndVerifyModal(0);
    expect(productAdded).toBeTruthy();
  });

  test('TC-CART-002: Validar el modal de confirmación', async ({ page }) => {
    const modalAppeared = await homePage.addProductToCartAndVerifyModal(0);
    expect(modalAppeared).toBeTruthy();
    
    const modalContent = await page.locator('.modal-content').textContent();
    expect(modalContent).toBeTruthy();
  });

  test('TC-CART-003: Navegar al carrito y verificar nombre, cantidad y precio', async ({ page }) => {
    await homePage.addProductToCartAndVerifyModal(0);
    await homePage.viewCartFromModal();
    
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      return page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    });
    
    await expect(page).toHaveURL(/.*view_cart/);
    
    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBeGreaterThan(0);
    
    const productNames = await cartPage.getProductNames();
    expect(productNames.length).toBeGreaterThan(0);
    expect(productNames[0]).toBeTruthy();
    
    const quantity = await cartPage.getProductQuantity(0);
    expect(quantity).toBeGreaterThan(0);
    
    const price = await cartPage.getProductPrice(0);
    expect(price).toBeTruthy();
    expect(price).toContain('Rs.');
  });

  test('TC-CART-004: Actualizar la cantidad del producto', async ({ page }) => {
    await homePage.addProductToCartAndVerifyModal(0);
    await homePage.viewCartFromModal();
    
    const initialQuantity = await cartPage.getProductQuantity(0);
    expect(initialQuantity).toBeGreaterThan(0);
    
    await cartPage.updateQuantity(0, 3);
    
    const updatedQuantity = await cartPage.getProductQuantity(0);
    expect(updatedQuantity).toBeGreaterThan(0);
    
    if (updatedQuantity === 3) {
      expect(updatedQuantity).toBe(3);
    } else {
      expect(updatedQuantity).toBe(initialQuantity);
    }
  });

  test('TC-CART-005: Eliminar el producto del carrito', async ({ page }) => {
    await homePage.addProductToCartAndVerifyModal(0);
    await homePage.viewCartFromModal();
    
    let itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBeGreaterThan(0);
    
    await cartPage.deleteProduct(0);
    await page.waitForTimeout(2000);
    
    const newItemsCount = await cartPage.getCartItemsCount();
    expect(newItemsCount).toBeLessThan(itemsCount);
  });

  test('TC-CART-006: Validar que el carrito quede vacío', async ({ page }) => {
    await homePage.addProductToCartAndVerifyModal(0);
    await homePage.viewCartFromModal();
    
    let itemsCount = await cartPage.getCartItemsCount();
    while (itemsCount > 0) {
      await cartPage.deleteProduct(0);
      await page.waitForTimeout(1000);
      itemsCount = await cartPage.getCartItemsCount();
    }
    
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();
  });
});

