import { test, expect } from "@playwright/test";

const PAGES = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "products", path: "/products" },
  { name: "aira", path: "/products/aira" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
];

for (const page_ of PAGES) {
  test(`${page_.name} renders cleanly`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto(page_.path);
    // Let fonts load and the entrance animation settle before asserting layout.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1200);

    // Exactly one H1, and it must carry readable text.
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeVisible();
    expect((await h1.textContent())?.trim().length).toBeGreaterThan(0);

    // The page must not scroll sideways at any breakpoint.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);

    expect(errors).toEqual([]);

    await page.screenshot({
      path: `tests/e2e/__screens__/${page_.name}-${info.project.name}.png`,
      fullPage: false,
    });
  });
}
