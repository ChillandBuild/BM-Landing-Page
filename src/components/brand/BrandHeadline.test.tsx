import { render } from "@testing-library/react";
import BrandHeadline from "./BrandHeadline";

test("exposes the plain text to assistive tech via aria-label", () => {
  const { container } = render(
    <BrandHeadline
      as="h1"
      segments={[{ text: "We build products that " }, { text: "think", emphasis: true }, { text: "." }]}
    />
  );
  expect(container.querySelector("h1")?.getAttribute("aria-label")).toBe(
    "We build products that think."
  );
});

test("renders emphasis segments in blue", () => {
  const { container } = render(
    <BrandHeadline segments={[{ text: "that " }, { text: "think", emphasis: true }]} />
  );
  expect(container.querySelector("em")?.className).toContain("text-blue");
});

test("seeded=false renders no coral marks", () => {
  const { container } = render(<BrandHeadline segments={[{ text: "bloom" }]} seeded={false} />);
  expect(container.querySelectorAll(".bg-coral").length).toBe(0);
});

test("keeps each word unbreakable so marked glyphs cannot split it", () => {
  // Regression: inline-block glyph marks let "lifecycle" wrap as "li fecycle".
  const { container } = render(<BrandHeadline segments={[{ text: "the whole lifecycle" }]} />);
  const words = container.querySelectorAll("span.whitespace-nowrap");
  expect(words.length).toBe(3);
  expect(words[2].textContent).toBe("lifecycle");
});

test("preserves the exact text so search, find-in-page and copy still work", () => {
  // Marks are overlays: no dotless glyph substitution may reach the DOM text.
  const { container } = render(
    <BrandHeadline as="h1" segments={[{ text: "We build products that " }, { text: "think", emphasis: true }]} />
  );
  expect(container.querySelector("h1")?.textContent).toBe("We build products that think");
});

test("seeded headlines mark every lowercase o", () => {
  const { container } = render(<BrandHeadline segments={[{ text: "bloom" }]} />);
  expect(container.querySelectorAll(".bg-coral").length).toBe(2);
});
