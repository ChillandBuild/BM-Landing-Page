import { render } from "@testing-library/react";
import BrandFlower from "./BrandFlower";

test("renders four cream petals and a coral core", () => {
  const { container } = render(<BrandFlower size={120} />);
  const petals = container.querySelectorAll('g[fill="#F2EFE9"] path');
  expect(petals.length).toBe(4);
  const core = container.querySelector('circle[fill="#FF6B4A"]');
  expect(core).not.toBeNull();
});

test("applies rotation via transform on the wrapper group", () => {
  const { container } = render(<BrandFlower rotation={30} />);
  expect(container.querySelector("[data-flower-spin]")?.getAttribute("transform")).toContain(
    "rotate(30"
  );
});
