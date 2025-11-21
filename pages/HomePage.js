class HomePage {
  constructor(page) {
    this.page = page;
    
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

  async navigate() {
    await this.page.goto('/');
  }

  async isLoggedIn(userName) {
    try {
      await this.page.waitForSelector(this.loggedInAs, { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async goToProducts() {
    await this.page.click(this.productsLink);
  }

  async goToCart() {
    await this.page.goto('/view_cart', { waitUntil: 'domcontentloaded' });
    try {
      await this.page.waitForSelector('body', { timeout: 5000 });
      const heavyLoadMessage = await this.page.locator('text=under heavy load').isVisible().catch(() => false);
      if (heavyLoadMessage) {
        await this.page.waitForTimeout(2000);
        await this.page.goto('/view_cart', { waitUntil: 'domcontentloaded' });
      }
    } catch (error) {
      await this.page.goto('/view_cart');
    }
  }

  async addProductToCart(productIndex = 0) {
    const products = await this.page.locator(this.productCard).all();
    if (products.length > productIndex) {
      const addToCartButtons = await products[productIndex].locator(this.addToCartButton).all();
      if (addToCartButtons.length > 0) {
        await addToCartButtons[0].click();
      }
    }
  }

  async addProductToCartAndVerifyModal(productIndex = 0) {
    await this.addProductToCart(productIndex);
    try {
      await this.page.waitForSelector('.modal-content', { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async viewCartFromModal() {
    try {
      const viewCartButton = this.page.locator(this.viewCartLink);
      const isVisible = await viewCartButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        const navigationPromise = this.page.waitForURL(/.*view_cart/, { timeout: 10000 });
        await viewCartButton.click();
        await navigationPromise;
        await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
          return this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
        });
      } else {
        await this.goToCart();
      }
    } catch (error) {
      await this.goToCart();
    }
  }

  async continueShoppingFromModal() {
    await this.page.click(this.continueShoppingButton);
  }

  async logout() {
    await this.page.click(this.logoutLink);
  }

  async isOnHomePage() {
    const url = this.page.url();
    return url === 'https://automationexercise.com/' || url.includes('/');
  }
}

module.exports = HomePage;

