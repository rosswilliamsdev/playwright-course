import { expect } from "@playwright/test";

export class DeliveryDetails {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByRole("textbox", { name: "First name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.streetInput = page.getByRole("textbox", { name: "Street" });
    this.postCodeInput = page.getByRole("textbox", { name: "Post code" });
    this.cityInput = page.getByRole("textbox", { name: "City" });
    this.countryDropdown = page.getByRole("combobox");
    this.saveAddressButton = page.getByRole("button", {
      name: "Save address for next time",
    });

    this.addressCards = page.locator('[data-qa="saved-address-container"]');

    this.savedAddressFirstName = page.locator(
      '[data-qa="saved-address-firstName"]'
    );
    this.savedAddressLastName = page.locator(
      '[data-qa="saved-address-lastName"]'
    );
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAddressPostCode = page.locator(
      '[data-qa="saved-address-postcode"]'
    );
    this.savedAddressCountry = page.locator(
      '[data-qa="saved-address-country"]'
    );
    this.goToPaymentButton = page.getByRole("button", {
      name: "Continue to payment",
    });
  }

  async fillDeliveryDetails(userAddress) {
    await this.firstNameInput.waitFor();
    await this.lastNameInput.waitFor();
    await this.streetInput.waitFor();
    await this.postCodeInput.waitFor();
    await this.cityInput.waitFor();
    await this.countryDropdown.waitFor();

    await this.firstNameInput.fill(userAddress.firstName);
    await this.lastNameInput.fill(userAddress.lastName);
    await this.streetInput.fill(userAddress.street);
    await this.postCodeInput.fill(userAddress.postCode);
    await this.cityInput.fill(userAddress.city);
    await this.countryDropdown.selectOption(userAddress.country);
  }

  async saveDetails() {
    const cardsBeforeSaving = await this.addressCards.count();
    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();
    await this.addressCards.waitFor();
    const cardsAfterSaving = await this.addressCards.count();

    expect(cardsAfterSaving).toBeGreaterThan(cardsBeforeSaving);

    this.savedAddressFirstName.first().waitFor();
    expect(await this.savedAddressFirstName.first().innerText()).toBe(
      await this.firstNameInput.inputValue()
    );
    this.savedAddressLastName.first().waitFor();
    expect(await this.savedAddressLastName.first().innerText()).toBe(
      await this.lastNameInput.inputValue()
    );
    this.savedAddressStreet.first().waitFor();
    expect(await this.savedAddressStreet.first().innerText()).toBe(
      await this.streetInput.inputValue()
    );
    this.savedAddressCity.first().waitFor();
    expect(await this.savedAddressCity.first().innerText()).toBe(
      await this.cityInput.inputValue()
    );
    this.savedAddressPostCode.first().waitFor();
    expect(await this.savedAddressPostCode.first().innerText()).toBe(
      await this.postCodeInput.inputValue()
    );
    this.savedAddressCountry.first().waitFor();
    expect(await this.savedAddressCountry.first().innerText()).toBe(
      await this.countryDropdown.inputValue()
    );
  }

  async goToPayment() {
    await this.goToPaymentButton.waitFor();
    await this.goToPaymentButton.click();
    await this.page.waitForURL(/\/payment/);
  }
}
