import { expect, Page, test } from "@playwright/test";

async function addCookieToCart(page: Page) {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Menu" })).toBeVisible();

  await page
    .getByTitle(/Add 6 Brown Butter Chocolate Chip Cookie to cart/i)
    .click();
}

async function openCart(page: Page) {
  await page.getByRole("button", { name: /Open shopping cart/i }).click();
  await expect(page.getByRole("heading", { name: "Your cart" })).toBeVisible();
}

async function fillCustomerDetails(page: Page) {
  await page.getByRole("button", { name: /Provide customer details/i }).click();
  await page.getByLabel("First and last name").fill("Benji Tester");
  await page.getByLabel("Email address").fill("benji@example.com");
  await page.getByRole("button", { name: /Set order details/i }).click();
}

async function selectPickupDate(page: Page) {
  await expect(page.getByText("Pickup details")).toBeVisible();
  await page.getByRole("button", { name: /Select a pickup date/i }).click();
  await page
    .getByRole("grid")
    .locator("button:not([disabled])")
    .first()
    .click();
}

async function goToConfirmStep(page: Page) {
  await addCookieToCart(page);
  await openCart(page);
  await fillCustomerDetails(page);
  await selectPickupDate(page);
  await page.getByRole("button", { name: /Review and send order/i }).click();
}

test("persists the shopping cart across a page reload", async ({ page }) => {
  await addCookieToCart(page);
  await expect(
    page.getByRole("button", { name: /Open shopping cart/i }),
  ).toBeVisible();

  await page.reload();

  await expect(
    page.getByRole("button", { name: /Open shopping cart/i }),
  ).toBeVisible();

  await openCart(page);
  await expect(
    page.getByText(/1 box of 6 cookies/i),
  ).toBeVisible();
  await expect(page.getByText("Order Total: $21")).toBeVisible();
});

test("completes the supported pay-later storefront flow", async ({ page }) => {
  await page.route("**/api/fetch-customer", async (route) => {
    await route.fulfill({
      body: JSON.stringify({
        customer: {
          email: "benji@example.com",
          id: "cus_123",
          name: "Benji Tester",
        },
        isNewCustomer: false,
      }),
      contentType: "application/json",
      status: 200,
    });
  });

  await page.route("**/api/send-order-email", async (route) => {
    await route.fulfill({
      body: JSON.stringify({ result: "ok", resultCustomer: "ok" }),
      contentType: "application/json",
      status: 200,
    });
  });

  await goToConfirmStep(page);

  await expect(page.getByText("Order Summary")).toBeVisible();
  await page.getByRole("button", { name: /Send order/i }).click();

  await expect(page).toHaveURL(/\/success\?pay_later=true$/);
  await expect(page.getByRole("heading", { name: "Thank you!" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your order details" }),
  ).toBeVisible();
  await expect(
    page.getByText(/1 box of 6 cookies/i).last(),
  ).toBeVisible();
});

test("shows a customer lookup error instead of advancing", async ({ page }) => {
  await page.route("**/api/fetch-customer", async (route) => {
    await route.fulfill({
      body: JSON.stringify({ error: "Customer lookup failed" }),
      contentType: "application/json",
      status: 500,
    });
  });

  await addCookieToCart(page);
  await openCart(page);
  await fillCustomerDetails(page);

  await expect(
    page.getByLabel("Your details").getByText("Customer lookup failed"),
  ).toBeVisible();
  await expect(page.getByText("Your details")).toBeVisible();
});

test("shows an order submission error on the confirm step", async ({
  page,
}) => {
  await page.route("**/api/fetch-customer", async (route) => {
    await route.fulfill({
      body: JSON.stringify({
        customer: {
          email: "benji@example.com",
          id: "cus_123",
          name: "Benji Tester",
        },
        isNewCustomer: false,
      }),
      contentType: "application/json",
      status: 200,
    });
  });

  await page.route("**/api/send-order-email", async (route) => {
    await route.fulfill({
      body: JSON.stringify({ error: "Unable to send order" }),
      contentType: "application/json",
      status: 500,
    });
  });

  await goToConfirmStep(page);

  await page.getByRole("button", { name: /Send order/i }).click();

  await expect(
    page.getByLabel("Confirm and send").getByText("Unable to send order"),
  ).toBeVisible();
  await expect(page).toHaveURL("/");
});
