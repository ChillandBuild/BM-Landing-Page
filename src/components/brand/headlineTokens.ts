export type HeadlineTokenKind = "plain" | "seed-o" | "tittle-i" | "tittle-j";

export type HeadlineToken = { ch: string; kind: HeadlineTokenKind };

/**
 * Splits headline text into glyph tokens for BM Serif's brand modifications.
 * Only lowercase o/i/j carry marks — the seeded counter and the coral tittle
 * are drawn for lowercase forms only.
 */
export function tokenizeHeadline(text: string): HeadlineToken[] {
  return Array.from(text).map((ch) => {
    if (ch === "o") return { ch, kind: "seed-o" as const };
    if (ch === "i") return { ch, kind: "tittle-i" as const };
    if (ch === "j") return { ch, kind: "tittle-j" as const };
    return { ch, kind: "plain" as const };
  });
}
