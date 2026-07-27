import { render } from "@testing-library/react";
import LogoLockup from "./LogoLockup";

const mark = (container: HTMLElement) =>
  container.querySelector('svg[aria-label="Bloom Matrix"]');

test("light-ground lockup gives the silver mark its own Ink tile", () => {
  const { container } = render(<LogoLockup tone="ink" />);
  expect(mark(container)?.querySelector('rect[fill="#141414"][rx="26"]')).not.toBeNull();
  expect(mark(container)?.querySelector("linearGradient")).not.toBeNull();
});

test("dark-ground lockup drops the tile — the page already supplies the ground", () => {
  const { container } = render(<LogoLockup tone="cream" />);
  expect(mark(container)?.querySelector('rect[rx="26"]')).toBeNull();
  expect(mark(container)?.querySelector("linearGradient")).not.toBeNull();
});
