# Vyrix Beta 2 — UI Overhaul Plan

## How This Works
This file is the single source of truth for the UI overhaul.
We work **task by task**. Each task has a status, exact files to touch, and a checklist.
After each task is coded, we verify visually before moving to the next.

**Figma file key:** `nrbr3lLHtE4uKHEWIkDoSm`
**Stack:** React + Vite, plain JSX + CSS, no animation libraries — pure CSS + existing `useScrollAnimation` hook.

---

## Rules for Claude Code
- Only edit files listed under each task. Touch nothing else.
- No new npm dependencies. All animations are pure CSS.
- Use Figma MCP (`get_screenshot` or `get_design_context`) to verify exact values when in doubt.
- After each task, confirm which files were changed.

---

## Task Status Overview

| # | Task | Status |
|---|------|--------|
| 1 | Hero — remove screenshot, fix backdrop, add rotation | ✅ DONE |
| 2 | AppPreview — new section with zoom-in scroll animation | ✅ DONE |
| 3 | WhatsNew — match Figma layout + slide-in animations | ✅ DONE |
| 4 | Reviews — refine card layout + fade-up animations | ✅ DONE |
| 5 | Download — light background, match Figma design | ✅ DONE |
| 6 | Global — smooth scroll + section entrance transitions | ⬜ TODO |

---

## Task 1 — Hero Section

**Status:** ✅ DONE

**Figma reference:** node `31:2` (circles), node `5:19` (text + buttons)

**Files to edit:**
- `src/components/Hero/Hero.jsx`
- `src/components/Hero/Hero.css`

**Changes:**

1. **Remove** the entire `<ScrollReveal className="hero__screenshot" ...>` block and its `<img>` from `Hero.jsx`.
   - The screenshot does NOT belong in the hero. It moves to the new AppPreview section (Task 2).
   - After removal, Hero only contains: heading, subheading, and CTA buttons.

2. **Fix the circular backdrop** to match Figma node `31:2`:
   - Keep the `hero-circles.svg` image.
   - Position: `position: absolute`, `left: 50%`, `top: -80px`, `transform: translateX(-50%)`, `width: 1100px`, `max-width: none`, `z-index: 0`, `pointer-events: none`.

3. **Add slow rotation animation** to the backdrop:
   ```css
   @keyframes hero-rotate {
     from { transform: translateX(-50%) rotate(0deg); }
     to   { transform: translateX(-50%) rotate(360deg); }
   }
   .hero__backdrop {
     animation: hero-rotate 60s linear infinite;
     transform-origin: 50% 50%;
   }
   ```

**Verification checklist:**
- [x] Hero shows heading, subheading, two CTA buttons — nothing else below the buttons
- [x] Circular backdrop is centered behind the heading
- [x] Backdrop slowly rotates (60s full rotation, barely noticeable, just alive)
- [x] No layout shift on mobile

---

## Task 2 — AppPreview Section (New)

**Status:** ✅ DONE

**Figma reference:** node `4:169` (Product SS frame — the app screenshot card)

**Files to create:**
- `src/components/AppPreview/AppPreview.jsx`
- `src/components/AppPreview/AppPreview.css`

**Files to edit:**
- `src/views/LandingPageView.jsx` — add `<AppPreview />` between `<Hero />` and `<WhatsNewSection />`

**Changes:**

1. **New component `AppPreview`:**
   - Renders `hero-screenshot.png` centered, full-width card.
   - Import: `import heroScreenshot from '../../assets/images/hero-screenshot.png'`
   - Import and use the existing `useScrollAnimation` hook directly (same as ScrollReveal does).

2. **Layout (from Figma node `4:169`):**
   ```css
   .app-preview {
     padding: 0 60px 96px;
   }
   .app-preview__card {
     max-width: 1457px;
     margin: 0 auto;
     border-radius: 16px;
     overflow: hidden;
     box-shadow: 0 4px 40px rgba(0, 0, 0, 0.18);
   }
   .app-preview__card img {
     width: 100%;
     height: auto;
     display: block;
   }
   ```

3. **Scroll animation — zoom from bottom:**
   ```css
   .app-preview__card {
     opacity: 0;
     transform: scale(0.88) translateY(60px);
     transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                 transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
   }
   .app-preview__card.app-preview__card--visible {
     opacity: 1;
     transform: scale(1) translateY(0);
   }
   ```
   - Wire using `useScrollAnimation` — when visible, add the `--visible` class.

4. **Hero fade effect:**
   - When AppPreview enters viewport, add class `hero--scrolled` to `document.querySelector('.hero')`.
   - In `Hero.css`:
     ```css
     .hero--scrolled {
       opacity: 0.35;
       transition: opacity 0.6s ease;
     }
     ```
   - Remove the class when AppPreview leaves viewport (observer disconnect or re-check).

**Verification checklist:**
- [x] Screenshot card appears below hero on scroll
- [x] Card zooms in smoothly from slightly below/small
- [x] Hero fades out as the card comes in
- [x] Card has rounded corners and shadow matching Figma

---

## Task 3 — WhatsNew Section

**Status:** ✅ DONE

**Figma reference:** node `4:141` (full WhatsNew frame)

**Files to edit:**
- `src/components/WhatsNewSection/WhatsNewSection.jsx`
- `src/components/WhatsNewSection/WhatsNewSection.css`
- `src/components/FeatureBlock/FeatureBlock.jsx`
- `src/components/FeatureBlock/FeatureBlock.css`

**Layout changes (from Figma node `4:141`):**

1. Change from 2-column grid to **single-column stacked rows**.
2. Each row = `[icon] + [text block]`, alternating icon position (left for even index, right for odd index).
3. Icon size: `212×212px` (use placeholder div with background color if image not present).
4. Feature heading: `18px`, `font-weight: 700`, color `#000`.
5. Feature body text: `16px`, `font-weight: 400`, color `#424242`, `line-height: 1.6`.
6. Row gap: `72px` between feature rows.
7. Section padding: `96px 40px`.
8. Section heading `"What's New"`: `48px`, centered, `color: #000`.

**FeatureBlock layout:**
```css
.feature-block {
  display: flex;
  align-items: center;
  gap: 64px;
}
.feature-block--reverse {
  flex-direction: row-reverse;
}
.feature-block__icon {
  flex-shrink: 0;
  width: 212px;
  height: 212px;
  border-radius: 24px;
  background: #e0e0e0; /* placeholder */
  overflow: hidden;
}
.feature-block__text {
  flex: 1;
}
```

**Pass `index` as prop to `FeatureBlock` from `WhatsNewSection` to control direction.**

**Animation — slide in from left/right:**
```css
.feature-block {
  opacity: 0;
  transform: translateX(-60px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.feature-block--reverse {
  transform: translateX(60px);
}
.feature-block--visible {
  opacity: 1;
  transform: translateX(0);
}
```
- Each block uses `useScrollAnimation` and gets `transitionDelay: index * 120ms`.

**Verification checklist:**
- [x] Features are single-column with alternating icon sides
- [x] Icons are visible (or clean placeholder squares)
- [x] Each row slides in from appropriate direction on scroll
- [x] Heading and subheading match Figma style

---

## Task 4 — Reviews Section

**Status:** ✅ DONE

**Figma reference:** node `21:44` (Beta 1 Feedback / Reviews frame)

**Files to edit:**
- `src/components/ReviewsSection/ReviewsSection.jsx`
- `src/components/ReviewsSection/ReviewsSection.css`
- `src/components/ReviewCard/ReviewCard.jsx`
- `src/components/ReviewCard/ReviewCard.css`

**Layout (from Figma node `21:44` — scattered card layout):**

1. Keep `column-count: 2; column-gap: 32px` — masonry columns are correct.
2. Each card:
   ```css
   .review-card {
     background: #ffffff;
     border-radius: 16px;
     padding: 30px;
     box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
     break-inside: avoid;
     margin-bottom: 24px;
   }
   ```
3. Card text: `15px`, color `#424242`, `line-height: 1.7`.
4. Star rating at top of each card (already exists — keep it).
5. Section heading `"Reviews"`: `48px`, centered.
6. Subheading: `20px`, max-width `640px`, centered.

**Animation — fade up:**
```css
.review-card {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out,
              transform 0.6s ease-out;
}
.review-card--visible {
  opacity: 1;
  transform: translateY(0);
}
```
- Wire `useScrollAnimation` in `ReviewCard`, stagger delay `(index % 3) * 150ms`.
- Pass `delayMs` prop from `ReviewsSection` to `ReviewCard`.

**Verification checklist:**
- [x] Cards render in 2-column masonry layout
- [x] Cards have teal background (#75a5b7), 26px rounded corners, no shadow (per Figma node `21:44` — superseded the earlier "white + shadow" note)
- [x] Each card fades+slides up independently on scroll
- [x] Star ratings removed — not present in Figma design node `21:44` (superseded the earlier "star ratings visible" note)

---

## Task 5 — Download Section

**Status:** ✅ DONE

**Figma reference:** node `26:14`

**Files to edit:**
- `src/components/PlatformSection/PlatformSection.jsx`
- `src/components/PlatformSection/PlatformSection.css`

**Layout (from Figma node `26:14`):**

1. **Light background, matches Figma** — use `background: var(--color-bg)` (the dark bar in Figma belongs to the Footer, not this section).
2. Text stays dark (`#212121` / `#000`) on the light background.
3. Section heading `"Choose your platform"`: `48px`, `var(--font-display)`, `#212121`, centered, `margin-bottom: 64px`.
4. Platform cards:
   - Side by side, `gap: 80px`, centered with flexbox, with a `1px × 280px` `#616161` vertical divider between them.
   - Each card: icon (`62×62px`) + platform name (`32px`, `#000`, `font-weight: 500`) in a row with `gap: 16px`.
   - Below badge: two buttons **stacked vertically**, `gap: 12px`, both full width (`height: 42px`, `min-width: 169px`).
5. Button styles on light background:
   - `"Download"` → filled: `background: #206f8d`, `color: #ebebeb`.
   - `"How to install"` → outline: `border: 1px solid #616161`, `color: #000`, transparent background.
6. All other dimensions/padding remain the same.

**Animation — slide up:**
```css
.platform-card {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.platform-card--visible {
  opacity: 1;
  transform: translateY(0);
}
```
- Stagger: first card `0ms`, second card `120ms`.
- Use `ScrollReveal` (already used in this component — just verify it applies the right classes).

**Verification checklist:**
- [x] Section background is light `var(--color-bg)` (corrected — the earlier "dark/black" note was wrong; dark bar is the Footer)
- [x] Text is dark (`#212121`/`#000`); Download button filled teal `#206f8d`, How-to-install outlined `#616161`
- [x] Platform icons visible with correct size (62×62px)
- [x] Cards animate up on scroll with stagger (via ScrollReveal: `translateY(32px)`, 0.7s, delays 0ms / 120ms)
- [x] Matches Figma node `26:14` visually (light section, `1px × 280px` `#616161` divider between cards)

---

## Task 6 — Global Scroll Polish

**Status:** ⬜ TODO

**Files to edit:**
- `src/index.css`
- `src/views/LandingPageView.css`

**Changes:**

1. Add to `src/index.css`:
   ```css
   html {
     scroll-behavior: smooth;
   }
   ```

2. Add section entrance animation to `src/index.css`:
   ```css
   .section-fade-in {
     opacity: 0;
     transform: translateY(24px);
     transition: opacity 0.5s ease, transform 0.5s ease;
   }
   .section-fade-in.section-fade-in--visible {
     opacity: 1;
     transform: translateY(0);
   }
   ```

3. Add `section-fade-in` class to the `<section>` element in each of these components and wire `useScrollAnimation` at the section level:
   - `WhatsNewSection.jsx`
   - `ReviewsSection.jsx`
   - `PlatformSection.jsx`

**Verification checklist:**
- [ ] Clicking nav links scrolls smoothly to sections
- [ ] Each section fades/rises in as it enters the viewport
- [ ] No janky jumps between sections

---

## Figma Node Quick Reference

| Section | Node ID | Label |
|---------|---------|-------|
| Full landing page | `1:3` | Landing Page |
| Hero circles backdrop | `31:2` | Group 241 |
| App screenshot preview | `4:169` | Product SS |
| What's New full section | `4:141` | Whats new |
| Reviews full section | `21:44` | Beta 1 Feedback |
| Download section | `26:14` | (download frame) |

**To inspect any node in Claude Code:**
```
Use Figma MCP → get_screenshot(fileKey: "nrbr3lLHtE4uKHEWIkDoSm", nodeId: "<id>")
or
Use Figma MCP → get_design_context(fileKey: "nrbr3lLHtE4uKHEWIkDoSm", nodeId: "<id>")
```

---

## DO NOT TOUCH
- `src/components/Header/`
- `src/components/Footer/`
- `src/components/LoadingScreen/`
- `src/components/ScrollReveal/` (use as-is)
- `src/controllers/useScrollAnimation.jsx` (use as-is)
- `src/models/*.js` (no data changes)
- `vite.config.js`
- `package.json` (no new deps)
- `public/`
