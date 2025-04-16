import * as dotenv from "dotenv";
dotenv.config();
import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetails, userDetails } from "../data/userDetails";

test("My Account using cookie injection and mocking network request", async ({
  page,
}) => {
  const loginToken = await getLoginToken(
    adminDetails.username,
    adminDetails.password
  );

  await page.route("**/api/user**", async (route, request) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ message: "Playwright error from mocking" }),
    });
  });

  const myAccount = new MyAccountPage(page);
  await myAccount.visit();

  await page.evaluate(
    ([loginTokenInsideBrowserCode]) => {
      document.cookie = "token=" + loginTokenInsideBrowserCode;
    },
    [loginToken]
  );
  await myAccount.visit();
  await myAccount.waitForPageHeading();
  await myAccount.waitForErrorMessage();
});
