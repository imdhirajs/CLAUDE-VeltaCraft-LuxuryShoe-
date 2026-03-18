# CLAUDE.md — Velta Craft Project Context

## Project Overview
**Velta Craft** is a luxury scroll-animation website for handcrafted shoes.
- Stack: Next.js 14 (App Router, TypeScript), Tailwind CSS, HTML5 Canvas API
- No Three.js. No GSAP. Canvas only.
- Fonts: Cormorant Garamond (headings) + Inter (body) from Google Fonts
- Deploy target: Vercel

---

## Brand Identity
| Key | Value |
|-----|-------|
| Name | Velta Craft |
| Tagline | Built to Last Forever. |
| Sub-tagline | Where leather becomes legend. |
| Aesthetic | Bottega Veneta meets Apple.com — dark, warm, cinematic |
| Feel | Intentional, expensive, editorial. Never cold or corporate. |

---

## Color System
```css
--bg-deep:       #0A0805;   /* near-black warm — main background */
--bg-section:    #130E08;   /* slightly lighter warm black */
--leather:       #8B4513;   /* burnt leather brown */
--leather-light: #A0522D;   /* sienna — hover states */
--gold:          #CFB53B;   /* gold thread — primary accent */
--gold-light:    #E8D48A;   /* soft gold — glows and highlights */
--cream:         #FAF0E6;   /* linen cream — primary text */
--cream-muted:   #C8B89A;   /* warm grey — secondary text */

--gradient-hero: linear-gradient(180deg, #0A0805 0%, #1A0F07 50%, #0A0805 100%);
--gradient-gold: linear-gradient(135deg, #CFB53B 0%, #E8D48A 50%, #CFB53B 100%);
--gradient-text: linear-gradient(135deg, #FAF0E6 0%, #CFB53B 40%, #E8D48A 100%);
```

---

## Typography System

### Google Fonts Import (in `layout.tsx`)
- **Cormorant Garamond**: weights 300, 400, 500, 600, 700 (include italic variants)
- **Inter**: weights 300, 400, 500

### Scale (desktop)
| Role | Size | Weight | Letter-spacing | Font | Notes |
|------|------|--------|---------------|------|-------|
| Display | 96px | 300 | -2px | Cormorant Garamond italic | Hero/CTA |
| H1 | 72px | 300 | -1.5px | Cormorant Garamond | |
| H2 | 56px | 400 | -1px | Cormorant Garamond | |
| H3 | 36px | 500 | — | Cormorant Garamond | |
| Body | 16px | 300 | — | Inter | line-height 1.8 |
| Caption | 12px | 400 | 3px | Inter | UPPERCASE |
| CTA | 14px | 500 | 2px | Inter | UPPERCASE |

---

## Scroll Animation Architecture

### Source
- Video file: `scroll-animation.mp4` in project root
- Extract frames: `ffmpeg -i scroll-animation.mp4 -vf fps=30 public/frames/frame_%04d.webp`
- Output format: `.webp` to `/public/frames/`

### Canvas Setup
- Full viewport, `position: sticky`, background `#0A0805`
- Total scroll height: **500vh**
- Frame driven by scroll progress (0–1)

### 3-Act Story
| Act | Scroll % | Scene |
|-----|----------|-------|
| 1 | 0–28% | Shoe levitates, still, spotlight lit |
| 2 | 30–68% | Deconstructs — leather, sole, gold threads float apart |
| 3 | 72–100% | Magnetic snap reassembly into perfect shoe |

---

## Text Overlay Specs

### Section 1 — Chapter One (visible 0%–22%)
- **Position**: bottom-left, 10% from left, 15% from bottom
- **Label**: `CHAPTER ONE` — 11px Inter, letter-spacing 4px, color `#CFB53B`, uppercase
- **Headline**: `"Built to Last\nForever."` — 80px Cormorant Garamond, weight 300, italic, gradient text `#FAF0E6 → #CFB53B`, line-height 0.95
- **Subtext**: `"Every stitch placed by hand."` — 16px Inter weight 300, color `#C8B89A`, margin-top 20px

### Section 2 — Chapter Two (visible 30%–55%)
- **Position**: top-right, 8% from right, 20% from top
- **Label**: `CHAPTER TWO` — same label style
- **Headline**: `"Raw.\nRefined.\nReal."` — 72px Cormorant Garamond, weight 400, color `#FAF0E6`, each word its own line
- **Subtext**: `"See what goes into every pair."` — same subtext style

### Section 3 — Chapter Three (visible 60%–78%)
- **Position**: center, perfectly centered horizontally
- **Label**: `CHAPTER THREE` — centered
- **Headline**: `"Crafted.\nNot Made."` — 88px Cormorant Garamond, weight 300, italic, gradient `#CFB53B → #E8D48A → #FAF0E6`, centered
- **Subtext**: `"47 individual components. One vision."` — centered, color `#C8B89A`

### Section 4 — CTA (visible 84%–100%)
- **Position**: perfectly centered
- **Headline**: `"Own the Craft."` — 96px Cormorant Garamond, weight 300, color `#FAF0E6`
- **Subtext**: `"Handcrafted in small batches. Ships worldwide."` — 15px Inter, color `#C8B89A`
- **CTA Button**:
  - Text: `SHOP THE DROP →`
  - 13px Inter, weight 500, letter-spacing 3px
  - Background: `linear-gradient(135deg, #CFB53B, #E8D48A)`
  - Color: `#0A0805`
  - Padding: `18px 48px`
  - Border-radius: `0px` (sharp — luxury)
  - Hover: `scale(1.03)` with `0.3s ease`
  - Box-shadow: `0 0 40px rgba(207, 181, 59, 0.3)`

---

## Navbar

- Fixed, full width, initially transparent
- After scroll past 100px: `background: rgba(10,8,5,0.85)`, `backdrop-filter: blur(20px)`
- **Left**: `VELTA CRAFT` — 13px Inter, weight 500, letter-spacing 4px, color `#FAF0E6`
- **Right links**: `Craft` `Collection` `Story` — 12px Inter, weight 400, letter-spacing 2px, color `#C8B89A`, hover → `#CFB53B` with 0.3s transition
- **Far right pill**: `SHOP NOW`
  - Border: `1px solid #CFB53B`, color `#CFB53B`, padding `8px 20px`, border-radius `2px`
  - Hover: `background #CFB53B`, color `#0A0805`

---

## Loading Screen

- Background: `#0A0805`
- Center: `VELTA CRAFT` — 14px Inter, letter-spacing 6px, color `#CFB53B`
- Progress bar: 200px wide, 1px height
  - Track: `rgba(255,255,255,0.1)`
  - Fill: `linear-gradient(90deg, #CFB53B, #E8D48A)`
- Below bar: percentage counter — 11px Inter, color `#C8B89A`
- Dismiss: `0.8s` opacity fade when frames fully loaded
- **Site does not render until 100% of frames are preloaded**

---

## Below-Fold Sections

### Features Section
- Background: `#130E08`
- 3 columns:
  - Gold SVG icon (stitch / leather / sole)
  - 11px label, gold, letter-spacing 3px
  - 28px Cormorant Garamond heading
  - 15px Inter body, color `#C8B89A`
- Top border: `1px solid rgba(207,181,59,0.15)`

### Craftsmanship Section
- Full bleed dark background
- Large centered quote: 48px Cormorant Garamond italic
- `"Every pair takes 14 hours to make."`
- Gold divider: 60px wide, 1px, centered, color `#CFB53B`

### Final CTA Section
- Background: `linear-gradient(180deg, #130E08, #0A0805)`
- Centered `"Own the Craft."` heading
- Same gold CTA button as scroll overlay

---

## Micro-Details (Non-Negotiable)

### Grain Texture Overlay
```css
/* Full page, pointer-events: none, z-index top */
background-image: url("data:image/svg+xml,..."); /* SVG feTurbulence noise */
opacity: 0.03;
position: fixed;
inset: 0;
pointer-events: none;
```

### Scroll Progress Bar
- `position: fixed`, top 0, left 0
- `height: 1px`, `background: #CFB53B`
- Width driven by `window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100`

### Custom Cursor
- Inner: 8px circle, `border: 1px solid #CFB53B`
- Outer: 32px ring following with ~100ms lag
- On CTA hover: both rings fill gold

### Smooth Scroll
```css
html { scroll-behavior: smooth; }
```

### Page Transition
- Fade in on load: `opacity 0 → 1` over `0.6s`

---

## Performance Rules

- Preload ALL frames before showing any content
- Use `requestAnimationFrame` for canvas rendering — never `setInterval`
- Mobile (`< 768px`): skip every 2nd frame
- Cache frames in `next.config.js`:
```js
async headers() {
  return [{ source: '/frames/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }]
}
```
- All frame images must be `.webp`

---

## SEO & Metadata (`layout.tsx`)

```ts
export const metadata = {
  title: 'Velta Craft — Handcrafted Luxury Footwear',
  description: 'Where leather becomes legend. Handcrafted shoes built to last forever.',
  themeColor: '#0A0805',
  openGraph: {
    images: ['/frames/frame_0001.webp'],
  },
}
```

---

## File Structure Reference

```
/
├── public/
│   └── frames/          ← .webp frames extracted from video
├── app/
│   ├── layout.tsx        ← fonts, metadata, grain overlay, cursor
│   ├── page.tsx          ← main scroll page
│   └── globals.css       ← CSS variables, base resets
├── components/
│   ├── Navbar.tsx
│   ├── LoadingScreen.tsx
│   ├── ScrollCanvas.tsx  ← Canvas + frame animation logic
│   ├── TextOverlay.tsx   ← Chapter text with opacity transitions
│   ├── FeaturesSection.tsx
│   ├── CraftsmanshipSection.tsx
│   └── FinalCTA.tsx
├── hooks/
│   └── useScrollProgress.ts
├── scroll-animation.mp4
└── next.config.js
```

---

## Claude Code Behavior Rules

- Never use Three.js, GSAP, Framer Motion, or any animation library — Canvas + CSS only
- Every color must reference the CSS variable system above — no hardcoded hex in components
- Tailwind for layout/spacing only; typography styles applied via `className` with inline or CSS variable values
- Always build mobile-responsive (frame-skip logic on < 768px)
- Prioritize perceived performance: loading screen → instant canvas → lazy below-fold sections
- When building a new section, match the warmth and editorial tone of the design philosophy before writing a single line
