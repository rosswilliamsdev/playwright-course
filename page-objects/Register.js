import { v4 as uuidv4 } from "uuid";

export class Register {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "E-Mail" });
    this.passwordInput = page.getByRole("textbox", {
      name: "Password",
    });
    this.registerButton = page.getByRole("button", {
      name: "Register",
    });
  }

  async signUpAsNewUser(email, password) {
    //type into email input
    await this.emailInput.waitFor();
    const emailId = uuidv4();

    await this.emailInput.fill(email);
    //type into password input
    await this.passwordInput.waitFor();

    await this.passwordInput.fill(password);

    // click register button
    await this.registerButton.waitFor();
    await this.registerButton.click();
  }
}
