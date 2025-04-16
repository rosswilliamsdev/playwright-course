export class MyAccountPage {
  constructor(page) {
    this.page = page;
    this.header = page.getByRole("heading", { name: "My Account" });
    this.errorMessage = page.locator('[data-qa="error-message"]');
  }

  async visit() {
    await this.page.goto("/my-account");
  }
  async waitForPageHeading() {
    await this.header.waitFor();
  }
  async waitForErrorMessage() {
    await this.errorMessage.waitFor();
  }
}
