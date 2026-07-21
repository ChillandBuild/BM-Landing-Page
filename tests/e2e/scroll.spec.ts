import { test } from "@playwright/test";
test("home sections", async ({ page }, info) => {
  await page.goto("/");
  const marks = [1000, 2600, 6200, 7600, 9200];
  for (let i = 0; i < marks.length; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), marks[i]);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `tests/e2e/__screens__/sec${i}-${info.project.name}.png` });
  }
});
