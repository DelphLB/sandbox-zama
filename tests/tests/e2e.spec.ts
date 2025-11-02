import { test, expect } from "@playwright/test";

test.describe("Sandbox Console", () => {
  // --- SIGN IN FLOW ---
  test("should sign in and redirect to dashboard", async ({ page }) => {
    await page.goto("/");
    // Fill the mock sign-in email and submit
    await page.getByTestId("signin-email").fill("demo@test.com");
    await page.getByTestId("signin-continue").click();

    // Verify that the user is redirected to the dashboard
    await expect(page.getByText("Welcome")).toBeVisible();
  });

  // --- API KEYS: CREATE + REGENERATE ---
  test("should create and regenerate an API key", async ({ page }) => {
    await page.goto("/");

    // Handle mock sign-in if not already logged in
    if (
      await page
        .getByTestId("signin-email")
        .isVisible()
        .catch(() => false)
    ) {
      await page.getByTestId("signin-email").fill("demo@test.com");
      await page.getByTestId("signin-continue").click();
    }

    // Navigate to the API Keys page
    await page.getByTestId("nav-keys").click();

    // Create a new key
    await page.getByTestId("keys-create").click();
    const table = page.locator("table");
    await expect(table).toContainText("Key-1");

    // Reveal key value to compare before/after regeneration
    const firstRow = page.locator("tbody tr").first();
    await firstRow.locator('[data-testid^="key-reveal-"]').click();
    const codeBefore = await firstRow.locator("code").innerText();

    // Regenerate the key
    await firstRow.locator('[data-testid^="key-regen-"]').click();

    // Wait until the key value changes
    await expect
      .poll(async () => {
        const codeAfter = await firstRow.locator("code").innerText();
        return codeAfter !== codeBefore;
      })
      .toBeTruthy();
  });

  // --- API KEYS: REVOKE ---
  test('should revoke an API key and remove the row', async ({ page }) => {
  await page.goto('/');

  if (await page.getByTestId('signin-email').isVisible().catch(() => false)) {
    await page.getByTestId('signin-email').fill('demo@test.com');
    await page.getByTestId('signin-continue').click();
  }

  await page.getByTestId('nav-keys').click();

  await page.getByTestId('keys-create').click();
  await page.waitForSelector('[data-testid^="key-revoke-"]', { timeout: 5000 });

  const revokeBtn = page.locator('[data-testid^="key-revoke-"]').first();
  await revokeBtn.click();

  // ✅ Wait until no revoke buttons remain
  await expect.poll(async () => {
    return await page.locator('[data-testid^="key-revoke-"]').count();
  }).toBe(0);
});

  // --- USAGE PAGE: CHART VISIBILITY ---
  test("should display the usage chart with data", async ({ page }) => {
    await page.goto("/");

    // Handle login if needed
    if (
      await page
        .getByTestId("signin-email")
        .isVisible()
        .catch(() => false)
    ) {
      await page.getByTestId("signin-email").fill("demo@test.com");
      await page.getByTestId("signin-continue").click();
    }

    // Navigate to Usage page
    await page.getByTestId("nav-usage").click();

    // Verify the chart container is visible
    const chart = page.getByTestId("usage-chart");
    await expect(chart).toBeVisible();

    // The chart should render at least one SVG path (data line)
    const paths = await page.locator("svg path").count();
    expect(paths).toBeGreaterThan(0);
  });
});
