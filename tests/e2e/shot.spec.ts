import { test } from "@playwright/test";
const PAGES = [["home","/"],["services","/services"],["products","/products"],["aira","/products/aira"],["about","/about"],["contact","/contact"]];
for (const [name, path] of PAGES) {
  test(`shot-${name}`, async ({ page }, info) => {
    await page.goto(path);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `tests/e2e/__screens__/${name}-${info.project.name}.png`, fullPage: false });
  });
}
