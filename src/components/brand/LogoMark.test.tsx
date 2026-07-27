import { render } from "@testing-library/react";
import LogoMark from "./LogoMark";

test("mark defaults to brushed silver petals", () => {
  const { container } = render(<LogoMark size={40} />);
  const petals = container.querySelector("[data-flower-spin]");
  expect(petals?.querySelectorAll("path")).toHaveLength(4);
  expect(petals?.getAttribute("stroke")).toMatch(/^url\(#bloom-silver-/);
  expect(container.querySelector("linearGradient")).not.toBeNull();
});

test("rotation turns the petals but not the tile or the centre knockout", () => {
  const { container } = render(<LogoMark tile rotation={40} />);
  expect(container.querySelector("[data-flower-spin]")?.getAttribute("transform")).toContain(
    "rotate(40"
  );
  // The tile and the mask's knockout circle must stay put.
  expect(container.querySelector('rect[rx="26"]')?.getAttribute("transform")).toBeNull();
  const hole = container.querySelector("mask circle");
  expect(hole?.getAttribute("cx")).toBe("60");
  expect(hole?.getAttribute("cy")).toBe("60");
});

test("mask is oversized so spun petals are not sheared at the box edge", () => {
  const { container } = render(<LogoMark rotation={45} />);
  const rect = container.querySelector("mask rect");
  expect(Number(rect?.getAttribute("width"))).toBeGreaterThan(120);
  expect(Number(rect?.getAttribute("x"))).toBeLessThan(0);
});

test("silver leaves the core open so the ground shows through", () => {
  const { container } = render(<LogoMark />);
  // No drawn disc — the mask hole IS the core.
  expect(container.querySelector('circle[fill="#FF6B4A"]')).toBeNull();
  const mask = container.querySelector("mask");
  expect(mask?.querySelector('circle[fill="#000"]')).not.toBeNull();
});

test("tile carries an Ink ground for silver on light surfaces", () => {
  const { container } = render(<LogoMark tile />);
  expect(container.querySelector('rect[fill="#141414"][rx="26"]')).not.toBeNull();
});

test("no tile is drawn unless asked for", () => {
  const { container } = render(<LogoMark />);
  expect(container.querySelector('rect[rx="26"]')).toBeNull();
});

test("flat cuts remain available and draw the coral core", () => {
  const { container } = render(<LogoMark tone="ink" />);
  expect(container.querySelectorAll('g[stroke="#141414"] path')).toHaveLength(4);
  expect(container.querySelector('circle[fill="#FF6B4A"]')).not.toBeNull();
  expect(container.querySelector("linearGradient")).toBeNull();
});

test("cream cut reverses the flat mark for dark grounds", () => {
  const { container } = render(<LogoMark tone="cream" />);
  expect(container.querySelectorAll('g[stroke="#F2EFE9"] path')).toHaveLength(4);
});

test("mono drops the coral core to a single colour", () => {
  const { container } = render(<LogoMark tone="ink" mono />);
  expect(container.querySelector('circle[fill="#FF6B4A"]')).toBeNull();
  expect(container.querySelector('circle[fill="#141414"]')).not.toBeNull();
});

test("two marks on one page get distinct mask and gradient ids", () => {
  const { container } = render(
    <>
      <LogoMark />
      <LogoMark />
    </>
  );
  const maskIds = Array.from(container.querySelectorAll("mask")).map((m) => m.id);
  const gradIds = Array.from(container.querySelectorAll("linearGradient")).map((g) => g.id);
  expect(new Set(maskIds).size).toBe(2);
  expect(new Set(gradIds).size).toBe(2);
});
