/**
 * THE one-flower rule, as code.
 *
 * Every flower on the site — the logo mark, the hero blooms, the favicon, the
 * OG card and the value-props motifs — is this geometry. Import from here
 * rather than copying paths, so the rule cannot quietly drift again.
 *
 * Four heptagon petals in a diagonal 2x2, each with a SQUARE inner corner at
 * 52/68. Those corners sit 11.3 units from centre, which is why the seed is
 * r=13: it covers them, so the petals tuck underneath it and the seed reads as
 * anchored rather than floating in the gap between blocks.
 *
 * The petals are already diagonal, so unlike the old organic flower they need
 * no 45deg correction — do not wrap them in one.
 */

export const FLOWER_PETALS = {
  topLeft: "M23 6L35 6L52 23L52 52L23 52L6 35L6 23Z",
  topRight: "M97 6L85 6L68 23L68 52L97 52L114 35L114 23Z",
  bottomLeft: "M23 114L35 114L52 97L52 68L23 68L6 85L6 97Z",
  bottomRight: "M97 114L85 114L68 97L68 68L97 68L114 85L114 97Z",
} as const;

export const ALL_PETALS = [
  FLOWER_PETALS.topLeft,
  FLOWER_PETALS.topRight,
  FLOWER_PETALS.bottomLeft,
  FLOWER_PETALS.bottomRight,
];

/** Covers the petals' inner corners (11.3 from centre) so the seed is held. */
export const SEED_RADIUS = 13;

export const FLOWER_CENTRE = 60;

export const CREAM = "#F2EFE9";
export const CORAL = "#FF6B4A";
