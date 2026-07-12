# Liora — Home Care Design System
### A premium landing page identity for high-end residential cleaning & home maintenance

> **A note on how this was built:** liora.aura.build is a client-rendered React app, so I couldn't scrape its live CSS, exact hex values, or animation keyframes directly — only page metadata was accessible. What follows is a **best-guess, fully-specified design system** built to match the brief ("premium, high-end residential home care") and the calm, feminine, editorial mood the name "Liora" suggests. It's designed to be internally consistent and immediately buildable, not a pixel-for-pixel trace of the original. Treat every token below as a real decision you can build from — adjust freely.

---

## 1. Brand Essence

**Liora** (Hebrew-rooted, "light is mine") reads as warm, unhurried, and quietly confident — the opposite of a discount cleaning service. The design metaphor is **"the clean reveal"**: everything transitions from soft/muted to clear and bright, echoing what the service actually does to a home. This metaphor drives the signature animation (Section 6).

**Mood words:** calm, sunlit, tactile, editorial, restrained luxury — think boutique hospitality brand, not a franchise cleaning app.

---

## 2. Color Palette

Warm, sun-washed neutrals with a single muted botanical accent and a soft gold for moments of emphasis. Avoids the generic "cream + terracotta" AI-default by leaning green/gold instead of orange/clay.

| Token | Hex | Usage |
|---|---|---|
| `--linen` | `#F8F5EF` | Primary background |
| `--stone` | `#EFE8D9` | Secondary section background, cards |
| `--ink` | `#2B2A25` | Primary text (near-black, warm) |
| `--moss` | `#3F4A3C` | Headlines, dark UI surfaces, footer |
| `--sage` | `#8FA084` | Primary accent — buttons, links, icons |
| `--sage-light` | `#C7D2BC` | Hover states, subtle borders, tags |
| `--honey` | `#C9A667` | Rare emphasis accent — price highlights, quote marks, badges |
| `--cloud` | `#FFFFFF` | Cards on stone background, form fields |

**Usage rule:** 90% of the page is `linen`/`stone`/`ink`. `sage` carries all interactive elements. `honey` appears no more than once or twice per screen (a stat, a quote mark, a rating star) — it's a spark, not a scheme.

```css
:root {
  --linen: #F8F5EF;
  --stone: #EFE8D9;
  --ink: #2B2A25;
  --moss: #3F4A3C;
  --sage: #8FA084;
  --sage-light: #C7D2BC;
  --honey: #C9A667;
  --cloud: #FFFFFF;
}
```

---

## 3. Typography

Pairing: an elegant, slightly warm display serif with generous optical sizing, against a clean geometric-humanist sans for body and UI. Set italics as a recurring editorial device (not bold) for emphasis.

| Role | Typeface | Fallback stack | Notes |
|---|---|---|---|
| Display / Headlines | **Fraunces** (variable, opsz 72–144) | `"Fraunces", Georgia, serif` | Use light-to-medium weight (350–500); reserve italic for a single accent word per headline |
| Body | **Inter** or **General Sans** | `"Inter", -apple-system, sans-serif` | Weight 400 body, 500 for UI labels |
| Utility / labels / eyebrows | **Inter**, uppercase, tracked out | same as body | 12px, letter-spacing 0.12em, `--sage` color |

### Type scale (desktop → mobile)

| Element | Desktop | Mobile | Weight | Line-height |
|---|---|---|---|---|
| Hero H1 | 72px | 40px | 400 (Fraunces) | 1.05 |
| Section H2 | 44px | 30px | 400 (Fraunces) | 1.1 |
| Card H3 | 24px | 20px | 500 (Fraunces) | 1.2 |
| Body large | 19px | 17px | 400 (Inter) | 1.6 |
| Body | 16px | 15px | 400 (Inter) | 1.6 |
| Eyebrow/label | 12px | 11px | 500 (Inter) | 1.4, uppercase, +0.12em tracking |

```css
h1, h2, h3 { font-family: "Fraunces", Georgia, serif; font-weight: 400; color: var(--moss); }
h1 em, h2 em { font-style: italic; color: var(--sage); }
body, p, a, button { font-family: "Inter", -apple-system, sans-serif; color: var(--ink); }
.eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--sage); font-weight: 500; }
```

---

## 4. Layout & Spacing

**Grid:** 12-column, max content width `1240px`, side gutters `64px` desktop / `20px` mobile.

**Spacing scale (8px base):** `8 · 16 · 24 · 32 · 48 · 64 · 96 · 140`
Section vertical padding: `140px` desktop / `64px` mobile — this is generous on purpose; whitespace is part of the "premium" signal.

**Radius:** soft, not sharp, not pill-shaped.
- Cards / images: `24px`
- Buttons: `999px` (fully rounded — the one pill-shaped element, reserved for CTAs so they always read as tappable)
- Inputs: `12px`

**Shadows:** barely-there, warm-toned (never pure black):
```css
--shadow-soft: 0 8px 30px -12px rgba(43, 42, 37, 0.12);
--shadow-card: 0 4px 16px -8px rgba(63, 74, 60, 0.15);
```

### Wireframe concepts

**Hero (asymmetric, editorial):**
```
┌───────────────────────────────────────────┐
│  Logo            Services  About  Contact  │
│                                    [Book →]│
│                                             │
│  eyebrow: TRUSTED HOME CARE, SINCE 2016    │
│  Care for your home,          ┌──────────┐ │
│  the way it deserves          │  large   │ │
│  *(italic word)*               │ photo,   │ │
│                                │ rounded  │ │
│  Supporting copy line, 1-2     │ corners  │ │
│  sentences, calm and plain.    └──────────┘ │
│  [Book a visit →]  [See services]           │
└───────────────────────────────────────────┘
```

**Services (3-up cards, stone background):**
```
[icon]              [icon]              [icon]
Deep Cleaning        Recurring Care       Move-In/Out
Short body copy...   Short body copy...   Short body copy...
Learn more →         Learn more →         Learn more →
```

**Signature "Reveal" section** — see Section 6.

---

## 5. Components

### Buttons
```css
.btn-primary {
  background: var(--sage);
  color: var(--cloud);
  padding: 16px 32px;
  border-radius: 999px;
  font-weight: 500;
  font-size: 15px;
  transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s ease;
}
.btn-primary:hover { background: var(--moss); transform: translateY(-2px); }

.btn-secondary {
  background: transparent;
  color: var(--moss);
  border: 1px solid var(--moss);
  padding: 15px 31px;
  border-radius: 999px;
}
.btn-secondary:hover { background: var(--moss); color: var(--cloud); }
```

### Cards
White (`--cloud`) or stone surface, `24px` radius, `--shadow-card`, `40px` internal padding, icon in a `56px` circle tinted `--sage-light`.

### Navigation
Fixed/sticky, transparent over hero, transitions to `linen` with soft shadow after `80px` scroll. Logo in Fraunces italic. Nav links: Inter 15px, `--ink`, underline-on-hover using a `--sage` line that draws left-to-right (width 0→100%, 0.3s ease).

### Testimonials
Large `--honey` quotation mark (48px, decorative), italic Fraunces quote text at 22px, author name in small-caps Inter below a thin `--sage-light` rule.

### Forms/inputs
`--cloud` background, `1px solid var(--sage-light)` border, `12px` radius, focus state: border becomes `--sage` + `0 0 0 3px rgba(143,160,132,0.2)` ring.

---

## 6. Motion & Animation

Motion should feel like **light sweeping across a clean surface** — smooth, warm, never bouncy or glitchy. Standard easing: `cubic-bezier(0.22, 1, 0.36, 1)` (soft deceleration).

### Signature element: "The Reveal"
Before/after and gallery images load in a **desaturated, slightly blurred state** and sharpen + saturate into full color as they scroll into view, paired with a soft diagonal light-sweep overlay that passes across the image once. This is the one bold, ownable motion moment on the page — used for hero image, service photos, and any before/after content. Everything else on the page stays quiet by comparison.

```css
.reveal-image {
  filter: saturate(0.4) blur(6px);
  transform: scale(1.04);
  transition: filter 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1);
}
.reveal-image.in-view {
  filter: saturate(1) blur(0);
  transform: scale(1);
}
/* diagonal sweep overlay, animated via a pseudo-element translateX from -100% to 200% over 1.2s on .in-view */
```

### Standard scroll reveals (everything else)
Fade + rise, staggered by 80–100ms per element within a group:
```css
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
}
.fade-up.in-view { opacity: 1; transform: translateY(0); }
```

### Micro-interactions
- Buttons: lift 2px + darken on hover (see Section 5)
- Cards: shadow deepens and lifts 4px on hover, 0.3s
- Nav links: underline draws in on hover
- Icons: subtle 4° rotate or scale(1.08) on hover, spring-ish easing (`cubic-bezier(0.34,1.56,0.64,1)`), used sparingly

### Respect for motion preference
```css
@media (prefers-reduced-motion: reduce) {
  .reveal-image, .fade-up { transition: none !important; filter: none !important; transform: none !important; opacity: 1 !important; }
}
```

---

## 7. Imagery Style

- Warm, natural light photography — golden hour or soft window light, never flat studio lighting
- Real homes, real hands doing real tasks (not stock "smiling cleaner with spray bottle" clichés)
- Consistent warm color grade (slightly lifted shadows, muted highlights) to match the linen/moss palette
- Images always in rounded containers (`24px`), occasionally full-bleed for the hero or a "transformation" section

---

## 8. Iconography

Thin-line icons (1.5px stroke), rounded caps, monochrome in `--moss` or `--sage`, sized 24–32px. Avoid filled/solid icon sets — they read too corporate for this brand. A good source: Lucide or Phosphor (light weight).

---

## 9. Voice & Copy Guidelines

- Plain, warm, specific — never salesy. "We clean your home like it's ours," not "Unmatched cleaning solutions."
- Sentence case everywhere except the eyebrow labels (uppercase, tracked).
- CTAs describe the action from the customer's side: **"Book a visit"**, not "Submit," **"See pricing,"** not "Learn more" (unless genuinely just reading more).
- Numbers/stats are used sparingly and only when real and specific ("12,000+ homes cared for since 2016") — never vague ("Trusted by thousands").

---

## 10. Responsive Breakpoints

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 640px | Single column, section padding 64px, hero image stacks below text |
| Tablet | 640–1024px | 2-column card grids, reduced type scale |
| Desktop | 1024–1440px | Full layout as specified |
| Wide | > 1440px | Content stays capped at 1240px, extra space becomes margin |

---

## 11. Quick-Start Token Sheet (copy/paste)

```css
:root {
  /* Color */
  --linen: #F8F5EF;
  --stone: #EFE8D9;
  --ink: #2B2A25;
  --moss: #3F4A3C;
  --sage: #8FA084;
  --sage-light: #C7D2BC;
  --honey: #C9A667;
  --cloud: #FFFFFF;

  /* Type */
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Inter", -apple-system, sans-serif;

  /* Radius */
  --radius-card: 24px;
  --radius-btn: 999px;
  --radius-input: 12px;

  /* Shadow */
  --shadow-soft: 0 8px 30px -12px rgba(43, 42, 37, 0.12);
  --shadow-card: 0 4px 16px -8px rgba(63, 74, 60, 0.15);

  /* Motion */
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Spacing */
  --space-section: 140px;
  --space-section-mobile: 64px;
}
```

---

*Next step: hand this file to me (or paste it into a new chat) and say "build the homepage" and I'll scaffold the HTML/React + CSS directly from these tokens.*
