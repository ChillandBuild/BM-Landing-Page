export type HeadlineTokenKind = "plain" | "seed-o" | "tittle-i" | "tittle-j";

export type HeadlineToken = { ch: string; kind: HeadlineTokenKind };

/**
 * Splits headline text into glyph tokens for BM Serif's brand modifications.
 * Only lowercase o/i/j carry marks — the seeded counter and the oxblood tittle
 * are drawn for lowercase forms only.
 */
/**
 * Splits text into words and the whitespace between them. Glyph marks render as
 * inline-block spans, which the browser treats as line-break opportunities — so
 * each word is kept in its own nowrap group and only the real spaces stay
 * breakable. Without this, "lifecycle" can wrap as "li fecycle".
 */
export function splitWords(text: string): string[] {
  return text.split(/(\s+)/).filter((part) => part.length > 0);
}

export function isWhitespace(part: string): boolean {
  return /^\s+$/.test(part);
}

export function tokenizeHeadline(text: string): HeadlineToken[] {
  return Array.from(text).map((ch) => {
    if (ch === "o") return { ch, kind: "seed-o" as const };
    if (ch === "i") return { ch, kind: "tittle-i" as const };
    if (ch === "j") return { ch, kind: "tittle-j" as const };
    return { ch, kind: "plain" as const };
  });
}
