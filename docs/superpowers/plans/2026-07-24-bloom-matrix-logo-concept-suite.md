# Bloom Matrix Logo Concept Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate and verify three Bloom Matrix logo concept sheets, each containing a full lockup and standalone symbol in black, silver, and landing-page colorways.

**Architecture:** Use the supplied flower image as a visual reference, not an edit target. Generate one coherent presentation sheet per approved direction so its geometry remains consistent across all three colorways, then inspect each sheet and make at most one focused correction per direction. Copy final raster assets into the project without modifying the live logo components.

**Tech Stack:** Built-in image generation, local image inspection, PNG assets, shell-based file validation

## Global Constraints

- Render the wordmark exactly as `BLOOM MATRIX`.
- Use a clean, vector-friendly silhouette with balanced negative space.
- Black colorway: Ink `#141414` on Paper Cream `#F2EFE9`.
- Silver colorway: cool silver centered around `#BFC3C8` on Ink `#141414`.
- Landing-page colorway: Matrix Blue `#1747E0`, Paper Cream `#F2EFE9`, Seed Coral `#FF6B4A`, and Ink `#141414` only.
- Seed Coral is limited to the central seed or one small accent.
- Avoid mockup scenes, 3D perspective, watermarks, decorative backgrounds, and unrelated symbols.
- Do not modify `LogoMark`, `LogoWordmark`, favicons, social images, or other live website assets.
- Save final concepts under `public/images/logo-concepts/`.

---

### Task 1: Direction A — Geometric Bloom Rosette

**Files:**
- Create: `public/images/logo-concepts/direction-a-geometric-bloom-rosette.png`

**Interfaces:**
- Consumes: user-supplied geometric flower reference and the Global Constraints
- Produces: one comparison sheet containing the Direction A lockup and symbol in all three colorways

- [x] **Step 1: Generate the Direction A comparison sheet**

Use the built-in image-generation tool with the supplied flower as a reference image and this exact creative brief:

```text
Use case: logo-brand
Asset type: logo concept comparison sheet
Primary request: create Direction A for Bloom Matrix, an elegant eight-petal geometric bloom rosette inspired by the supplied reference, with crisp folded petal geometry around a small circular seed
Input image: supplied flower image is a visual reference only; redraw as clean original geometry
Style/medium: flat vector-style logo, minimal, premium, precise monoline construction
Composition/framing: three clean horizontal rows with identical geometry; each row shows a standalone symbol on the left and a horizontal symbol-plus-wordmark lockup on the right; generous spacing
Text (verbatim): "BLOOM MATRIX"
Row 1: Ink #141414 artwork on Paper Cream #F2EFE9
Row 2: restrained cool silver centered around #BFC3C8 on Ink #141414, with only subtle brushed-metal tonal variation
Row 3: Matrix Blue #1747E0 structure, Paper Cream #F2EFE9 negative space, Seed Coral #FF6B4A center seed, Ink #141414 wordmark
Constraints: exactly eight petals; exact wordmark once per row; no row labels; no tagline; no gradients except subtle silver tonality in row 2; no mockup; no 3D; no bevel; no extrusion; no watermark; no unrelated elements
```

- [x] **Step 2: Inspect the generated sheet**

Open the generated image and confirm:

```text
three rows; eight petals; standalone symbol plus lockup per row;
"BLOOM MATRIX" spelled exactly; specified colorways; no extra text;
balanced negative space; no mockup or 3D treatment
```

- [x] **Step 3: Correct one focused defect if necessary**

If inspection finds a defect, regenerate once while repeating every invariant and changing only the defect. If the result passes, copy it to:

```text
public/images/logo-concepts/direction-a-geometric-bloom-rosette.png
```

- [x] **Step 4: Validate the saved asset**

Run:

```bash
file public/images/logo-concepts/direction-a-geometric-bloom-rosette.png
```

Expected: PNG image data with non-zero dimensions.

### Task 2: Direction B — Minimal Four-Petal Bloom

**Files:**
- Create: `public/images/logo-concepts/direction-b-minimal-four-petal-bloom.png`

**Interfaces:**
- Consumes: user-supplied geometric flower reference and the Global Constraints
- Produces: one comparison sheet containing the Direction B lockup and symbol in all three colorways

- [x] **Step 1: Generate the Direction B comparison sheet**

Use the built-in image-generation tool with the supplied flower as a reference image and this exact creative brief:

```text
Use case: logo-brand
Asset type: logo concept comparison sheet
Primary request: create Direction B for Bloom Matrix, a bold four-petal geometric bloom that simplifies the supplied reference and evolves the existing website flower mark, with folded petal construction and excellent small-size clarity
Input image: supplied flower image is a visual reference only; redraw as clean original geometry
Style/medium: flat vector-style logo, minimal, confident, slightly heavier line weight than Direction A
Composition/framing: three clean horizontal rows with identical geometry; each row shows a standalone symbol on the left and a horizontal symbol-plus-wordmark lockup on the right; generous spacing
Text (verbatim): "BLOOM MATRIX"
Row 1: Ink #141414 artwork on Paper Cream #F2EFE9
Row 2: restrained cool silver centered around #BFC3C8 on Ink #141414, with only subtle brushed-metal tonal variation
Row 3: Matrix Blue #1747E0 structure, Paper Cream #F2EFE9 negative space, Seed Coral #FF6B4A center seed, Ink #141414 wordmark
Constraints: exactly four petals; exact wordmark once per row; no row labels; no tagline; no gradients except subtle silver tonality in row 2; no mockup; no 3D; no bevel; no extrusion; no watermark; no unrelated elements
```

- [x] **Step 2: Inspect the generated sheet**

Open the generated image and confirm:

```text
three rows; four petals; standalone symbol plus lockup per row;
"BLOOM MATRIX" spelled exactly; specified colorways; no extra text;
strong small-size silhouette; no mockup or 3D treatment
```

- [x] **Step 3: Correct one focused defect if necessary**

If inspection finds a defect, regenerate once while repeating every invariant and changing only the defect. If the result passes, copy it to:

```text
public/images/logo-concepts/direction-b-minimal-four-petal-bloom.png
```

- [x] **Step 4: Validate the saved asset**

Run:

```bash
file public/images/logo-concepts/direction-b-minimal-four-petal-bloom.png
```

Expected: PNG image data with non-zero dimensions.

### Task 3: Direction C — Matrix Flower Monogram

**Files:**
- Create: `public/images/logo-concepts/direction-c-matrix-flower-monogram.png`

**Interfaces:**
- Consumes: user-supplied geometric flower reference and the Global Constraints
- Produces: one comparison sheet containing the Direction C lockup and symbol in all three colorways

- [x] **Step 1: Generate the Direction C comparison sheet**

Use the built-in image-generation tool with the supplied flower as a reference image and this exact creative brief:

```text
Use case: logo-brand
Asset type: logo concept comparison sheet
Primary request: create Direction C for Bloom Matrix, a geometric flower whose modular internal negative space subtly suggests the initials B and M or a matrix grid while reading unmistakably as a flower first
Input image: supplied flower image is a visual reference only; redraw as clean original geometry
Style/medium: flat vector-style logo, minimal, architectural, precise, restrained complexity
Composition/framing: three clean horizontal rows with identical geometry; each row shows a standalone symbol on the left and a horizontal symbol-plus-wordmark lockup on the right; generous spacing
Text (verbatim): "BLOOM MATRIX"
Row 1: Ink #141414 artwork on Paper Cream #F2EFE9
Row 2: restrained cool silver centered around #BFC3C8 on Ink #141414, with only subtle brushed-metal tonal variation
Row 3: Matrix Blue #1747E0 structure, Paper Cream #F2EFE9 negative space, Seed Coral #FF6B4A center seed, Ink #141414 wordmark
Constraints: flower read first and monogram cue second; exact wordmark once per row; no row labels; no tagline; no gradients except subtle silver tonality in row 2; no mockup; no 3D; no bevel; no extrusion; no watermark; no unrelated elements
```

- [x] **Step 2: Inspect the generated sheet**

Open the generated image and confirm:

```text
three rows; flower reads before monogram; standalone symbol plus lockup per row;
"BLOOM MATRIX" spelled exactly; specified colorways; no extra text;
controlled complexity; no mockup or 3D treatment
```

- [x] **Step 3: Correct one focused defect if necessary**

If inspection finds a defect, regenerate once while repeating every invariant and changing only the defect. If the result passes, copy it to:

```text
public/images/logo-concepts/direction-c-matrix-flower-monogram.png
```

- [x] **Step 4: Validate the saved asset**

Run:

```bash
file public/images/logo-concepts/direction-c-matrix-flower-monogram.png
```

Expected: PNG image data with non-zero dimensions.

### Task 4: Final Suite Verification

**Files:**
- Verify: `public/images/logo-concepts/direction-a-geometric-bloom-rosette.png`
- Verify: `public/images/logo-concepts/direction-b-minimal-four-petal-bloom.png`
- Verify: `public/images/logo-concepts/direction-c-matrix-flower-monogram.png`

**Interfaces:**
- Consumes: all three completed concept sheets
- Produces: a verified concept suite ready for user comparison

- [x] **Step 1: Verify all expected files**

Run:

```bash
file public/images/logo-concepts/*.png
```

Expected: exactly three PNG images with non-zero dimensions.

- [x] **Step 2: Review the suite side by side**

Open all three images and confirm:

```text
Directions A, B, and C are visually distinct;
each direction contains black, silver, and landing-page colorways;
each direction contains both standalone symbols and full lockups;
all wordmarks read "BLOOM MATRIX";
none of the live logo files were modified.
```

- [x] **Step 3: Check repository scope**

Run:

```bash
git status --short
```

Expected: only the implementation plan and the three concept PNGs are new or modified, aside from unrelated pre-existing user files.
