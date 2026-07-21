import { stepSpin, addImpulse } from "./spin";

test("velocity decays toward zero over time", () => {
  const s = stepSpin({ angle: 0, velocity: 1 }, 16.67);
  expect(s.velocity).toBeLessThan(1);
  expect(s.velocity).toBeGreaterThan(0);
});

test("angle advances by velocity * dt", () => {
  const s = stepSpin({ angle: 10, velocity: 2 }, 10, 1); // friction=1 → no decay
  expect(s.angle).toBeCloseTo(30);
});

test("addImpulse increases velocity without moving the angle", () => {
  const s = addImpulse({ angle: 5, velocity: 1 }, 0.5);
  expect(s.velocity).toBe(1.5);
  expect(s.angle).toBe(5);
});

test("a flick eventually settles back to rest", () => {
  let s = { angle: 0, velocity: 0.05 };
  for (let i = 0; i < 600; i++) s = stepSpin(s, 16.67);
  expect(s.velocity).toBe(0);
});
