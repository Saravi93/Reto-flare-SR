/**
 * Page Object para la página de Login
 */

class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Selectores
    this.emailInput = 'input[data-qa="login-email"]';
    this.passwordInput = 'input[data-qa="login-password"]';
    this.loginButton = 'button[data-qa="login-button"]';
    this.signupNameInput = 'input[data-qa="signup-name"]';
    this.signupEmailInput = 'input[data-qa="signup-email"]';
    this.signupButton = 'button[data-qa="signup-button"]';
    this.errorMessage = '.login-form p';
    this.loggedInMessage = 'text=Logged in as';
  }

  /**
   * Navega a la página de login
   */
  async navigate() {
    await this.page.goto('/login');
  }

  /**
   * Realiza login con email y contraseña
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   */
  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  /**
   * Obtiene el mensaje de error si existe
   * @returns {Promise<string>} Mensaje de error
   */
  async getErrorMessage() {
    try {
      return await this.page.textContent(this.errorMessage);
    } catch (error) {
      return null;
    }
  }

  /**
   * Verifica si el login fue exitoso
   * @param {string} userName - Nombre del usuario esperado (opcional, solo para validación adicional)
   * @returns {Promise<boolean>} True si el login fue exitoso
   */
  async isLoggedIn(userName) {
    try {
      // Verificar que aparece el mensaje "Logged in as" (sin importar el nombre específico)
      await this.page.waitForSelector(this.loggedInMessage, { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtiene el texto del mensaje de login exitoso
   * @returns {Promise<string|null>} Texto del mensaje o null si no existe
   */
  async getLoggedInMessage() {
    try {
      // Verificar primero si el elemento existe antes de obtener su texto
      const locator = this.page.locator(this.loggedInMessage);
      const isVisible = await locator.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible) {
        return await locator.textContent();
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Verifica si está en la página de login
   * @returns {Promise<boolean>} True si está en la página de login
   */
  async isOnLoginPage() {
    return await this.page.url().includes('/login');
  }

  /**
   * Realiza signup (registro de nuevo usuario)
   * @param {string} name - Nombre del usuario
   * @param {string} email - Email del usuario
   */
  async signup(name, email) {
    await this.page.fill(this.signupNameInput, name);
    await this.page.fill(this.signupEmailInput, email);
    await this.page.click(this.signupButton);
  }
}

module.exports = LoginPage;

