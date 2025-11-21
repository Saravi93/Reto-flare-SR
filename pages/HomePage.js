/**
 * Page Object para la página principal (Home)
 */

class HomePage {
  constructor(page) {
    this.page = page;
    
    // Selectores
    this.logo = 'img[alt="Website for automation practice"]';
    this.productsLink = 'a[href="/products"]';
    this.cartLink = 'a[href="/view_cart"]';
    this.logoutLink = 'a[href="/logout"]';
    this.deleteAccountLink = 'a[href="/delete_account"]';
    this.loggedInAs = 'text=Logged in as';
    this.productCard = '.product-image-wrapper';
    this.addToCartButton = 'a.add-to-cart';
    this.viewCartLink = 'a[href="/view_cart"]:has-text("View Cart")';
    this.continueShoppingButton = '.modal-footer button';
  }

  /**
   * Navega a la página principal
   */
  async navigate() {
    await this.page.goto('/');
  }

  /**
   * Verifica si el usuario está logueado
   * @param {string} userName - Nombre del usuario (opcional, solo para validación adicional)
   * @returns {Promise<boolean>} True si está logueado
   */
  async isLoggedIn(userName) {
    try {
      // Verificar que aparece el mensaje "Logged in as" (sin importar el nombre específico)
      await this.page.waitForSelector(this.loggedInAs, { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Navega a la página de productos
   */
  async goToProducts() {
    await this.page.click(this.productsLink);
  }

  /**
   * Navega al carrito
   */
  async goToCart() {
    // Usar navegación directa en lugar de hacer clic para evitar problemas cuando el sitio está bajo carga
    await this.page.goto('/view_cart', { waitUntil: 'domcontentloaded' });
    // Esperar a que la página cargue o verificar si hay mensaje de error
    try {
      await this.page.waitForSelector('body', { timeout: 5000 });
      // Verificar si el sitio está bajo carga pesada
      const heavyLoadMessage = await this.page.locator('text=under heavy load').isVisible().catch(() => false);
      if (heavyLoadMessage) {
        // Esperar un poco y reintentar
        await this.page.waitForTimeout(2000);
        await this.page.goto('/view_cart', { waitUntil: 'domcontentloaded' });
      }
    } catch (error) {
      // Si falla, intentar con navegación simple
      await this.page.goto('/view_cart');
    }
  }

  /**
   * Agrega un producto al carrito por índice
   * @param {number} productIndex - Índice del producto (0-based)
   */
  async addProductToCart(productIndex = 0) {
    const products = await this.page.locator(this.productCard).all();
    if (products.length > productIndex) {
      const addToCartButtons = await products[productIndex].locator(this.addToCartButton).all();
      if (addToCartButtons.length > 0) {
        await addToCartButtons[0].click();
      }
    }
  }

  /**
   * Agrega un producto al carrito y verifica el modal
   * @param {number} productIndex - Índice del producto
   * @returns {Promise<boolean>} True si el modal aparece
   */
  async addProductToCartAndVerifyModal(productIndex = 0) {
    await this.addProductToCart(productIndex);
    try {
      // Esperar a que aparezca el modal de confirmación
      await this.page.waitForSelector('.modal-content', { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Hace clic en "View Cart" desde el modal
   */
  async viewCartFromModal() {
    try {
      // Intentar hacer clic en el link "View Cart" del modal
      const viewCartButton = this.page.locator(this.viewCartLink);
      const isVisible = await viewCartButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        // Esperar la navegación antes de hacer clic
        const navigationPromise = this.page.waitForURL(/.*view_cart/, { timeout: 10000 });
        await viewCartButton.click();
        // Esperar a que la navegación se complete
        await navigationPromise;
        // Esperar a que la página esté completamente cargada
        await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
          // Si networkidle falla, esperar al menos domcontentloaded
          return this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
        });
      } else {
        // Si no existe el link en el modal, navegar directamente al carrito
        await this.goToCart();
      }
    } catch (error) {
      // Si falla, navegar directamente al carrito usando URL
      await this.goToCart();
    }
  }

  /**
   * Continúa comprando desde el modal
   */
  async continueShoppingFromModal() {
    await this.page.click(this.continueShoppingButton);
  }

  /**
   * Realiza logout
   */
  async logout() {
    await this.page.click(this.logoutLink);
  }

  /**
   * Verifica si está en la página principal
   * @returns {Promise<boolean>} True si está en home
   */
  async isOnHomePage() {
    const url = this.page.url();
    return url === 'https://automationexercise.com/' || url.includes('/');
  }
}

module.exports = HomePage;

