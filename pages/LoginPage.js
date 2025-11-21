class LoginPage {
  constructor(page) {
    this.page = page;
    
    this.emailInput = 'input[data-qa="login-email"]';
    this.passwordInput = 'input[data-qa="login-password"]';
    this.loginButton = 'button[data-qa="login-button"]';
    this.signupNameInput = 'input[data-qa="signup-name"]';
    this.signupEmailInput = 'input[data-qa="signup-email"]';
    this.signupButton = 'button[data-qa="signup-button"]';
    this.errorMessage = '.login-form p';
    this.loggedInMessage = 'text=Logged in as';
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    try {
      return await this.page.textContent(this.errorMessage);
    } catch (error) {
      return null;
    }
  }

  async isLoggedIn(userName) {
    try {
      await this.page.waitForSelector(this.loggedInMessage, { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getLoggedInMessage() {
    try {
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

  async isOnLoginPage() {
    return await this.page.url().includes('/login');
  }

  async signup(name, email) {
    await this.page.fill(this.signupNameInput, name);
    await this.page.fill(this.signupEmailInput, email);
    await this.page.click(this.signupButton);
  }
}

module.exports = LoginPage;

