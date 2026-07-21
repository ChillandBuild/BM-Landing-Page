import { tokenizeHeadline } from "./headlineTokens";

test("marks lowercase o, i, j; leaves others plain", () => {
  const t = tokenizeHeadline("bloomij X");
  expect(t.map((x) => x.kind)).toEqual([
    "plain",
    "plain",
    "seed-o",
    "seed-o",
    "plain",
    "tittle-i",
    "tittle-j",
    "plain",
    "plain",
  ]);
});

test("uppercase letters stay plain", () => {
  expect(tokenizeHeadline("OIJ").every((x) => x.kind === "plain")).toBe(true);
});

test("preserves the original characters in order", () => {
  expect(tokenizeHeadline("think.").map((t) => t.ch).join("")).toBe("think.");
});
