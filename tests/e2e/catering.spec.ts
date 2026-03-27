import { expect, test } from "@playwright/test";

async function pickFirstAvailableEventDate() {
  // Placeholder to satisfy TypeScript in editor; implementation is in the test body.
}

test("validates the catering form before submit", async ({ page }) => {
  await page.goto("/catering");

  await page.getByRole("button", { name: /Submit catering request/i }).click();

  await expect(
    page.getByText("Please provide your first and last name."),
  ).toBeVisible();
  await expect(
    page.getByText("Please provide a valid email address."),
  ).toBeVisible();
  await expect(
    page.getByText("A date for the event is required."),
  ).toBeVisible();
});

test("submits a catering request successfully", async ({ page }) => {
  await page.route("**/api/catering-request", async (route) => {
    await route.fulfill({
      body: JSON.stringify({ result: "success" }),
      contentType: "application/json",
      status: 200,
    });
  });

  await page.goto("/catering");
  await page.getByLabel("Your name").fill("Benji Tester");
  await page.getByLabel("Your email address").fill("benji@example.com");
  await page
    .getByLabel("Catering details")
    .fill("We need individually wrapped cookies for a client event.");

  await page.getByRole("button", { name: /Date of your event/i }).click();
  await page
    .getByRole("grid")
    .locator("button:not([disabled])")
    .first()
    .click();

  await page.getByRole("button", { name: /Submit catering request/i }).click();

  await expect(
    page.getByText(/Thank you for considering us for your event!/i),
  ).toBeVisible();
});
