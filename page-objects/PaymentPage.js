import { expect } from "@playwright/test";
import { paymentDetails } from "../data/paymentDetails";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountCodeInput = page.getByRole("textbox", {
      name: "Discount code",
    });
    this.submitDiscountButton = page.getByRole("button", {
      name: "Submit discount",
    });
    this.discountMessage = page.getByText("Discount activated!");
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.discountPrice = page.locator('[data-qa="total-with-discount-value"]');

    //Payment details
    this.cardOwnerName = page.getByRole("textbox", {
      name: "Credit card owner",
    });
    this.cardNumber = page.getByRole("textbox", { name: "Credit card number" });
    this.cardExpirationDate = page.getByPlaceholder("Valid until");
    this.cardCvc = page.getByRole("textbox", { name: "Credit card CVC" });
    this.paymentButton = page.getByRole("button", { name: "Pay" });
  }

  async activateDiscount() {
    await this.discountCode.waitFor();
    await this.discountCodeInput.waitFor();
    await this.submitDiscountButton.waitFor();
    expect(await this.discountPrice.isVisible()).toBe(false);
    expect(await this.discountMessage.isVisible()).toBe(false);
    const code = await this.discountCode.innerText();

    //Option 1
    await this.discountCodeInput.fill(code);
    await expect(this.discountCodeInput).toHaveValue(code);

    //Option 2
    // await this.discountCodeInput.focus();
    // await this.page.keyboard.type(code, { delay: 1000 });
    // expect(await this.discountCodeInput.inputValue()).toBe(code);

    await this.submitDiscountButton.click();
    // check that the discount activated message appears
    await this.discountMessage.waitFor();
    // check that there is now a discounted price total showing
    await this.discountPrice.waitFor();
    // check that the discounted price total is smaller than the regular one
    await this.totalValue.waitFor();

    const discountPriceText = await this.discountPrice.innerText();
    const discountNumberOnly = discountPriceText.replace("$", "");
    const discountFinalNumber = parseInt(discountNumberOnly);

    const totalValueText = await this.totalValue.innerText();
    const totalValueNumberOnly = totalValueText.replace("$", "");
    const totalValueFinalNumber = parseInt(totalValueNumberOnly);

    expect(totalValueFinalNumber).toBeGreaterThan(discountFinalNumber);
  }
  async fillPaymentDetails(paymentDetails) {
    await this.cardOwnerName.waitFor();
    await this.cardNumber.waitFor();
    await this.cardExpirationDate.waitFor();
    await this.cardCvc.waitFor();

    await this.cardOwnerName.fill(paymentDetails.name);
    await this.cardNumber.fill(paymentDetails.number);
    await this.cardExpirationDate.fill(paymentDetails.expirationDate);
    await this.cardCvc.fill(paymentDetails.cvc);
  }

  async completePayment() {
    await this.paymentButton.waitFor();
    await this.paymentButton.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
  }
}
