import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";
import { Checkout } from "../page-objects/Checkout";
import { Login } from "../page-objects/Login";
import { Register } from "../page-objects/Register";
import { v4 as uuidv4 } from "uuid";
import { DeliveryDetails } from "../page-objects/DeliveryDetails";
import { deliveryDetails as userAddress } from "../data/deliveryDetails";
import { PaymentPage } from "../page-objects/PaymentPage";
import { paymentDetails } from "../data/paymentDetails";

test("New user full end-to-end test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.visit();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  await productsPage.sortByCheapest();

  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();

  const login = new Login(page);
  await login.continueToRegister();

  const register = new Register(page);
  const email = uuidv4() + "@gmail.com";
  const password = uuidv4();
  await register.signUpAsNewUser(email, password);

  const deliveryDetails = new DeliveryDetails(page);
  await deliveryDetails.fillDeliveryDetails(userAddress);
  await deliveryDetails.saveDetails(userAddress);
  await deliveryDetails.goToPayment();

  const paymentPage = new PaymentPage(page);
  await paymentPage.activateDiscount();
  await paymentPage.fillPaymentDetails(paymentDetails);
  await paymentPage.completePayment();
});
