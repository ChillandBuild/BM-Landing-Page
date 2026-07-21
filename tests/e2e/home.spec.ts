import { test, expect } from "@playwright/test";

test("homepage hero renders with the brand headline", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });

  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("h1")).toHaveAttribute("aria-label", "We build products that think.");
  expect(errors).toEqual([]);
});

test("hero flower spins when the pointer moves", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "coarse pointer uses the scroll fallback");

  await page.goto("/");
  const flower = page.locator("[data-flower-spin]").first();
  const before = await flower.getAttribute("transform");

  await page.mouse.move(200, 300);
  for (let x = 220; x <= 700; x += 40) await page.mouse.move(x, 340);
  await page.waitForTimeout(250);

  expect(await flower.getAttribute("transform")).not.toBe(before);
});

test("reduced motion keeps the flower static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const flower = page.locator("[data-flower-spin]").first();

  await page.mouse.move(200, 300);
  for (let x = 220; x <= 700; x += 40) await page.mouse.move(x, 340);
  await page.waitForTimeout(250);

  expect(await flower.getAttribute("transform")).toBe("rotate(0 60 60)");
});
