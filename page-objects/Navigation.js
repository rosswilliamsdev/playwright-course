import { isMobileViewport } from "../utils/isMobileViewport";

export class Navigation {
  constructor(page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = page.getByRole("link", { name: "Checkout" });
    this.burgerButton = page.locator('[data-qa="burger-button"]');
  }

  getBasketCount = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };

  goToCheckout = async () => {
    //if mobile, first open hamburger menu

    if (isMobileViewport(this.page)) {
      await this.burgerButton.waitFor();
      await this.burgerButton.click();
    }
    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();
    await this.page.waitForURL("/basket");
  };
}
