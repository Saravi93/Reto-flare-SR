/**
 * Page Object para la página de Checkout
 */

class CheckoutPage {
  constructor(page) {
    this.page = page;
    
    // Selectores
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

  /**
   * Navega a la página de checkout
   */
  async navigate() {
    await this.page.goto('/checkout');
  }

  /**
   * Verifica que la dirección del usuario esté cargada
   * @returns {Promise<boolean>} True si la dirección está visible
   */
  async isAddressLoaded() {
    try {
      // Buscar el heading "Address Details" o cualquier contenido de dirección
      const addressHeading = await this.page.locator('h2:has-text("Address Details")').isVisible({ timeout: 5000 });
      if (addressHeading) return true;
      
      // Alternativa: buscar listas con dirección
      const addressList = await this.page.locator('h3:has-text("Your delivery address")').isVisible({ timeout: 3000 });
      return addressList;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtiene la dirección mostrada
   * @returns {Promise<string>} Texto de la dirección
   */
  async getAddress() {
    try {
      // Buscar el contenido de dirección en las listas
      const addressSection = await this.page.locator('h2:has-text("Address Details")').locator('..').textContent();
      if (addressSection) return addressSection;
      
      // Alternativa: obtener texto de las listas de dirección
      const deliveryAddress = await this.page.locator('h3:has-text("Your delivery address")').locator('..').textContent();
      return deliveryAddress || '';
    } catch (error) {
      return null;
    }
  }

  /**
   * Añade un comentario al pedido
   * @param {string} comment - Comentario a añadir
   */
  async addComment(comment) {
    await this.page.fill(this.commentTextarea, comment);
  }

  /**
   * Procede a colocar el pedido (sin pago real)
   */
  async placeOrder() {
    await this.page.click(this.placeOrderButton);
  }

  /**
   * Completa el formulario de pago (para testing, no procesa pago real)
   * @param {Object} paymentData - Datos de pago
   */
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

  /**
   * Confirma el pago (no procesa pago real)
   */
  async confirmPayment() {
    await this.page.click(this.payButton);
  }

  /**
   * Verifica si el pedido fue colocado exitosamente
   * @returns {Promise<boolean>} True si el mensaje de éxito es visible
   */
  async isOrderPlaced() {
    try {
      await this.page.waitForSelector(this.successMessage, { timeout: 10000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtiene el mensaje de éxito
   * @returns {Promise<string>} Mensaje de éxito
   */
  async getSuccessMessage() {
    try {
      return await this.page.textContent(this.successMessage);
    } catch (error) {
      return null;
    }
  }

  /**
   * Descarga la factura (si está disponible)
   */
  async downloadInvoice() {
    try {
      await this.page.click(this.downloadInvoiceButton);
    } catch (error) {
      // La factura puede no estar disponible en todos los casos
      console.log('Invoice download button not available');
    }
  }

  /**
   * Verifica que el resumen del pedido esté visible
   * @returns {Promise<boolean>} True si el resumen está visible
   */
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

