class CartPage {
  constructor(page) {
    this.page = page;
    
    this.cartTable = '#cart_info_table';
    this.cartItems = 'tbody tr';
    this.productName = 'td.cart_description h4 a';
    this.productPrice = 'td.cart_price p';
    this.productQuantity = 'td.cart_quantity button';
    this.quantityInput = 'td.cart_quantity input[type="number"]';
    this.totalPrice = 'td.cart_total p';
    this.deleteButton = 'a.cart_quantity_delete';
    this.emptyCartMessage = 'text=Cart is empty!';
    this.proceedToCheckoutButton = 'a.check_out';
    this.continueShoppingButton = 'a[href="/"]';
  }

  async navigate() {
    await this.page.goto('/view_cart');
  }

  async getCartItemsCount() {
    try {
      const items = await this.page.locator(this.cartItems).all();
      return items.length;
    } catch (error) {
      return 0;
    }
  }

  async getProductNames() {
    const names = [];
    const items = await this.page.locator(this.cartItems).all();
    for (const item of items) {
      const name = await item.locator(this.productName).textContent();
      if (name) names.push(name.trim());
    }
    return names;
  }

  async getProductPrice(index = 0) {
    const items = await this.page.locator(this.cartItems).all();
    if (items.length > index) {
      return await items[index].locator(this.productPrice).textContent();
    }
    return null;
  }

  async getProductQuantity(index = 0) {
    const items = await this.page.locator(this.cartItems).all();
    if (items.length > index) {
      const inputLocator = items[index].locator(this.quantityInput);
      const inputExists = await inputLocator.count() > 0;
      
      if (inputExists) {
        const quantityText = await inputLocator.inputValue();
        return parseInt(quantityText) || 1;
      } else {
        const buttonLocator = items[index].locator(this.productQuantity);
        const quantityText = await buttonLocator.textContent();
        return parseInt(quantityText) || 1;
      }
    }
    return 0;
  }

  async updateQuantity(index, quantity) {
    const items = await this.page.locator(this.cartItems).all();
    if (items.length > index) {
      const inputLocator = items[index].locator(this.quantityInput);
      const inputExists = await inputLocator.count() > 0;
      
      if (inputExists) {
        await inputLocator.fill(quantity.toString());
        await inputLocator.press('Enter');
        await this.page.waitForTimeout(1000);
      } else {
        const buttonLocator = items[index].locator(this.productQuantity);
        await buttonLocator.click();
        await this.page.waitForTimeout(1000);
        
        const editableInput = items[index].locator(this.quantityInput);
        const editableExists = await editableInput.count() > 0;
        
        if (editableExists) {
          await editableInput.fill(quantity.toString());
          await editableInput.press('Enter');
          await this.page.waitForTimeout(1000);
        } else {
          console.log('Quantity update not supported - site may not allow editing quantity from cart');
        }
      }
    }
  }

  async deleteProduct(index = 0) {
    const items = await this.page.locator(this.cartItems).all();
    if (items.length > index) {
      await items[index].locator(this.deleteButton).click();
      await this.page.waitForTimeout(1000);
    }
  }

  async isCartEmpty() {
    try {
      await this.page.waitForSelector(this.emptyCartMessage, { timeout: 3000 });
      return true;
    } catch (error) {
      const count = await this.getCartItemsCount();
      return count === 0;
    }
  }

  async proceedToCheckout() {
    const isCartEmpty = await this.isCartEmpty();
    if (isCartEmpty) {
      throw new Error('Cannot proceed to checkout: cart is empty');
    }
    
    await this.page.waitForSelector(this.proceedToCheckoutButton, { timeout: 10000 });
    await this.page.click(this.proceedToCheckoutButton);
  }

  async continueShopping() {
    await this.page.click(this.continueShoppingButton);
  }

  async getTotalPrice() {
    try {
      const totalElements = await this.page.locator(this.totalPrice).all();
      if (totalElements.length > 0) {
        return await totalElements[totalElements.length - 1].textContent();
      }
    } catch (error) {
      return null;
    }
    return null;
  }
}

module.exports = CartPage;

