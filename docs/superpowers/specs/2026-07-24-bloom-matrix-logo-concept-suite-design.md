# Bloom Matrix Logo Concept Suite

Status: Approved direction; pending written-spec review  
Date: 2026-07-24  
Reference: user-supplied geometric floral emblem  
Existing identity: `docs/superpowers/specs/2026-07-21-editorial-bloom-identity-redesign.md`

## Goal

Create a polished Bloom Matrix logo exploration based on the supplied geometric
flower reference. The deliverable is a concept suite, not an automatic
replacement of the identity currently used by the website. The suite must make
the three directions easy to compare before one is selected for production use.

## Deliverables

Each direction includes:

- a horizontal lockup with the symbol and the words `BLOOM MATRIX`;
- a standalone square symbol for favicon, app-icon, and social-avatar use;
- a black colorway;
- a silver colorway;
- a landing-page colorway.

This produces nine primary lockup concepts and nine corresponding standalone
symbol treatments. Presentation sheets may group related versions, but each
design must remain clearly identifiable.

## Shared Design Rules

- Preserve the supplied reference's geometric, radial, flower-like character
  without tracing its imperfections.
- Use a clean, vector-friendly silhouette with balanced negative space.
- Keep petal spacing, line weight, and optical centering consistent.
- Pair the mark with a modern, restrained sans-serif wordmark.
- Render `BLOOM MATRIX` exactly, with no tagline or additional copy.
- Avoid gradients in the black and landing-page versions.
- Avoid mockup scenes, 3D perspective, watermarks, decorative backgrounds, and
  unrelated symbols.
- Keep enough spacing between symbol and wordmark for legibility at small sizes.
- The silver version may use restrained metallic tonal variation to communicate
  material, but the underlying logo geometry must remain flat and reproducible.

## Direction A — Geometric Bloom Rosette

An eight-petal radial flower directly inspired by the supplied reference. Each
petal is built from crisp folded geometry around a small circular seed. The
result should feel premium, balanced, and immediately recognizable as a bloom.

The wordmark uses widely tracked uppercase lettering. The symbol leads the
lockup and carries most of the personality.

Strength: closest to the user's reference and the clearest floral read.  
Trade-off: the most detailed direction, so the standalone icon must preserve
clear interior spaces at small sizes.

## Direction B — Minimal Four-Petal Bloom

A simplified four-petal flower that evolves the site's current Bloom Matrix
mark. The petals retain the folded, geometric construction suggested by the
reference, while the reduced count creates a bolder silhouette and stronger
small-size performance.

The wordmark uses moderately tracked uppercase lettering and a slightly heavier
weight than Direction A.

Strength: strongest continuity with the existing website identity.  
Trade-off: less visually similar to the supplied eight-petal reference.

## Direction C — Matrix Flower Monogram

A geometric flower whose internal negative space subtly suggests the initials
`B` and `M` or a modular matrix grid. The monogram cue must remain secondary:
the mark should read as a flower first and a technology symbol second.

The wordmark uses precise, architectural uppercase lettering with compact
tracking.

Strength: most distinctive connection between “Bloom” and “Matrix.”  
Trade-off: requires careful restraint to avoid visual complexity.

## Colorways

### Black

- Primary mark and wordmark: Ink `#141414`
- Background: Paper Cream `#F2EFE9` or white
- Treatment: solid, flat, high contrast

### Silver

- Primary mark and wordmark: cool silver range centered around `#BFC3C8`
- Background: Ink `#141414`
- Treatment: subtle brushed-metal tonal variation only; no chrome glare, bevel,
  extrusion, drop shadow, or mockup lighting

### Landing-Page Palette

- Matrix Blue: `#1747E0`
- Paper Cream: `#F2EFE9`
- Seed Coral: `#FF6B4A`
- Ink: `#141414`

Matrix Blue is the primary structural color, Paper Cream provides negative
space or background, Seed Coral is limited to the central seed or one small
accent, and Ink is used for the wordmark when needed. No additional hues enter
this colorway.

## Output and Review

The first delivery is a raster concept suite suitable for visual comparison.
Generated assets will be saved under `public/images/logo-concepts/` and shown
inline for review. The selected direction can then be redrawn as deterministic
SVG artwork and integrated into the site in a separate production step.

Concept review criteria:

- recognizable at a glance;
- balanced radial geometry;
- legible `BLOOM MATRIX` wordmark;
- faithful use of the specified colorway;
- no accidental extra text or symbols;
- clear distinction among Directions A, B, and C;
- usable silhouette when reduced.

## Scope Boundary

This concept phase does not replace `LogoMark`, `LogoWordmark`, favicons, social
images, or other live website assets. Production integration begins only after
the user selects a preferred direction and colorway.
