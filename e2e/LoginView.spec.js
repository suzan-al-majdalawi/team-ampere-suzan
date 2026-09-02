import { test, expect } from "@playwright/test";

test.describe("Mina uppgifter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("loggar in och öppnar Mina uppgifter", async ({ page }) => {
    await page.locator('input[type="text"]').fill("test@example.com");
    await page.locator('input[type="password"]').fill("password");

    await page.getByRole("button", { name: "Logga in" }).click();

    await expect(page).toHaveURL(/\/$/);

    await page.getByText("Mina uppgifter").click();

    await expect(page).toHaveURL(/\/profil/);

    await expect(
      page.getByRole("heading", { name: "Mina uppgifter" }),
    ).toBeVisible();
  });
});
