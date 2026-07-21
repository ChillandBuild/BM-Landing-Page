import { render } from "@testing-library/react";
import LogoMark from "./LogoMark";

test("mark is a blue tile with a coral core", () => {
  const { container } = render(<LogoMark size={40} />);
  expect(container.querySelector('rect[fill="#1747E0"]')).not.toBeNull();
  expect(container.querySelector('circle[fill="#FF6B4A"]')).not.toBeNull();
});

test("mark cuts four petals out of the tile in cream", () => {
  const { container } = render(<LogoMark />);
  expect(container.querySelectorAll('g[fill="#F2EFE9"] path').length).toBe(4);
});
