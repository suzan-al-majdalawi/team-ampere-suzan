import { test, expect } from "@playwright/test";

test("startsidan laddas", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Kraftly/i);
});
