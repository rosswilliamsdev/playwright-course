export class Login {
  constructor(page) {
    this.page = page;
    this.continueToRegisterButton = page.locator(
      '[data-qa="go-to-signup-button"]'
    );
  }
  async continueToRegister() {
    await this.continueToRegisterButton.waitFor();
    await this.continueToRegisterButton.click();
    await this.page.waitForURL(/\/signup/, { timeout: 3000 });
  }
}
