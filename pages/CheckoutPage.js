class CheckoutPage {
  constructor(page) {
    this.page = page;
    
    this.addressDetails = '.address_info';
    this.reviewOrder = '.review-payment';
    this.commentTextarea = 'textarea[name="message"]';
    this.placeOrderButton = 'a[href="/payment"]';
    this.nameOnCardInput = 'input[name="name_on_card"]';
    this.cardNumberInput = 'input[name="card_number"]';
    this.cvcInput = 'input[name="cvc"]';
    this.expiryMonthInput = 'input[name="expiry_month"]';
    this.expiryYearInput = 'input[name="expiry_year"]';
    this.payButton = 'button[data-qa="pay-button"]';
    this.successMessage = 'text=Order Placed!';
    this.downloadInvoiceButton = 'a[href*="download_invoice"]';
  }

  async navigate() {
    await this.page.goto('/checkout');
  }

  async isAddressLoaded() {
    try {
      const addressHeading = await this.page.locator('h2:has-text("Address Details")').isVisible({ timeout: 5000 });
      if (addressHeading) return true;
      
      const addressList = await this.page.locator('h3:has-text("Your delivery address")').isVisible({ timeout: 3000 });
      return addressList;
    } catch (error) {
      return false;
    }
  }

  async getAddress() {
    try {
      const addressSection = await this.page.locator('h2:has-text("Address Details")').locator('..').textContent();
      if (addressSection) return addressSection;
      
      const deliveryAddress = await this.page.locator('h3:has-text("Your delivery address")').locator('..').textContent();
      return deliveryAddress || '';
    } catch (error) {
      return null;
    }
  }

  async addComment(comment) {
    await this.page.fill(this.commentTextarea, comment);
  }

  async placeOrder() {
    await this.page.click(this.placeOrderButton);
  }

  async fillPaymentForm(paymentData = {}) {
    const defaultData = {
      nameOnCard: 'Test User',
      cardNumber: '4111111111111111',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2025'
    };
    
    const data = { ...defaultData, ...paymentData };
    
    await this.page.fill(this.nameOnCardInput, data.nameOnCard);
    await this.page.fill(this.cardNumberInput, data.cardNumber);
    await this.page.fill(this.cvcInput, data.cvc);
    await this.page.fill(this.expiryMonthInput, data.expiryMonth);
    await this.page.fill(this.expiryYearInput, data.expiryYear);
  }

  async confirmPayment() {
    await this.page.click(this.payButton);
  }

  async isOrderPlaced() {
    try {
      await this.page.waitForSelector(this.successMessage, { timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getSuccessMessage() {
    try {
      return await this.page.textContent(this.successMessage);
    } catch (error) {
      return null;
    }
  }

  async downloadInvoice() {
    try {
      await this.page.click(this.downloadInvoiceButton);
    } catch (error) {
      console.log('Invoice download button not available');
    }
  }

  async isReviewOrderVisible() {
    try {
      await this.page.waitForSelector(this.reviewOrder, { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = CheckoutPage;

