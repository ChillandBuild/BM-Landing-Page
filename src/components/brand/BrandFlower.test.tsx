import { render } from "@testing-library/react";
import BrandFlower from "./BrandFlower";
import LogoMark from "./LogoMark";
import { ALL_PETALS, SEED_RADIUS } from "./flowerGeometry";

const pathsOf = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("path")).map((p) => p.getAttribute("d"));

test("renders four cream petals and a coral core", () => {
  const { container } = render(<BrandFlower size={120} />);
  expect(container.querySelectorAll('g[fill="#F2EFE9"] path')).toHaveLength(4);
  expect(container.querySelector('circle[fill="#FF6B4A"]')).not.toBeNull();
});

test("applies rotation via transform on the wrapper group", () => {
  const { container } = render(<BrandFlower rotation={30} />);
  expect(container.querySelector("[data-flower-spin]")?.getAttribute("transform")).toContain(
    "rotate(30"
  );
});

test("the one-flower rule holds: flower and logo draw identical petals", () => {
  const flower = render(<BrandFlower />);
  const logo = render(<LogoMark tone="ink" />);
  expect(pathsOf(flower.container)).toEqual(ALL_PETALS);
  expect(pathsOf(logo.container)).toEqual(ALL_PETALS);
});

test("petals carry no 45deg correction — they are already diagonal", () => {
  const { container } = render(<BrandFlower />);
  const transforms = Array.from(container.querySelectorAll("g"))
    .map((g) => g.getAttribute("transform") ?? "")
    .join(" ");
  expect(transforms).not.toContain("rotate(45");
});

test("seed is wide enough to cover the petals' inner corners", () => {
  // Corners sit at (52,52) — 11.31 from centre. A smaller seed would leave it
  // floating in the gap between petals instead of resting on them.
  const cornerDistance = Math.hypot(60 - 52, 60 - 52);
  expect(SEED_RADIUS).toBeGreaterThan(cornerDistance);
});
