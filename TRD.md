# TRD — Ganpati Events Website (Next.js Rebuild)

**Companion to:** `PRD.md` (read it first; it holds all content and acceptance criteria)
**Reference site (source of truth):** https://ganpatieventsjodhpur.netlify.app/
**Build tool:** Antigravity (agentic IDE), using its browser agent to inspect the live site

---

## 1. Summary

A single-route, fully static Next.js site. No database, no API routes, no auth, no server state. All content lives in typed data files. All conversions are outbound links (`wa.me`, `tel:`, Instagram, Drive/camtom). The challenge is **fidelity**: the rebuilt site must look, read and behave the same as the live one.

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (latest stable), **App Router** |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS, with design tokens in CSS variables |
| Images | `next/image`, assets in `/public/images` |
| Fonts | `next/font` (same families as the live site, found during inspection) |
| Animation | Only what the live site actually has. Implement with CSS first. Add Framer Motion only if a live-site animation needs it. |
| Component primitives | Plain React. Optionally shadcn/ui primitives for the dialog (lightbox) and accordion, restyled to match the original. |
| Package manager | pnpm (or npm) |
| Hosting | Vercel (default) or Netlify. Both work with a static export, so no vendor-specific code is allowed. |
| Backend | None |

Not needed in this phase: Supabase, GSAP, analytics, CMS.

## 3. Architecture

### 3.1 Rendering
- One route: `app/page.tsx`, rendered as a Server Component.
- Interactive pieces are small Client Components (`"use client"`): package cards (expand/collapse), lightbox, FAQ accordion (if the live site uses one).
- No runtime data fetching. Prefer `output: 'export'` only if the live site has no need for server features; otherwise default Next output is fine.

### 3.2 Folder structure

```
/
├─ app/
│  ├─ layout.tsx          # fonts, <html lang>, metadata (title only)
│  ├─ page.tsx            # composes all sections in order
│  └─ globals.css         # Tailwind + CSS variables (tokens)
├─ components/
│  ├─ sections/
│  │  ├─ Header.tsx
│  │  ├─ Hero.tsx
│  │  ├─ About.tsx
│  │  ├─ Packages.tsx
│  │  ├─ CompareTable.tsx
│  │  ├─ BookingSteps.tsx
│  │  ├─ AddOns.tsx
│  │  ├─ HelpCta.tsx
│  │  ├─ Faq.tsx
│  │  ├─ Testimonials.tsx
│  │  ├─ FinalCta.tsx
│  │  └─ Footer.tsx
│  ├─ PackageCard.tsx     # client
│  ├─ Gallery.tsx         # client (grid + opens lightbox)
│  ├─ Lightbox.tsx        # client (focus trap, Esc, ×)
│  ├─ FloatingContact.tsx # bottom WhatsApp / Call buttons
│  └─ ui/                 # small shared bits (Button, Badge, Pill)
├─ content/
│  └─ site.ts             # ALL copy, prices, links (typed, from PRD Section 6)
├─ lib/
│  └─ whatsapp.ts         # message builders + encoder
├─ public/images/         # downloaded from live site
├─ PRD.md
└─ TRD.md
```

### 3.3 Content layer (single source of truth)
All copy goes in `content/site.ts`, copied **verbatim** from PRD Section 6. Components render from it and contain **no hardcoded copy**. This makes the text diff in the acceptance criteria easy to check.

```ts
// content/site.ts (shape)
export const CONTACT = {
  whatsappNumber: "919351975852",
  whatsappBase: "https://wa.me/919351975852",
  tel: "tel:+919351975852",
  instagram: "https://www.instagram.com/expert_birthday_setup/",
  instagramHandle: "@expert_birthday_setup",
  address: "Magra Punjla, Jodhpur",
  phoneDisplay: "9351975852",
} as const;

export type Pkg = {
  id: "essential" | "elegant" | "elite" | "luxury" | "signature"; // also the anchor id
  name: string;            // "Essential Collection"
  shortName: string;       // "Essential" (pill + WhatsApp text)
  priceCard: string;       // "Rs. 14,000"
  pricePill: string;       // "Rs.14,000"
  priceWhatsApp: string;   // "₹14,000"
  tagline: string;
  bestFor: string;
  badges: string[];        // e.g. ["⭐ Most Booked", "PREMIUM CUSTOM EXPERIENCE"]
  features: string[];      // verbatim, in order
  images: { src: string; alt: string }[];
};

export const PACKAGES: Pkg[] = [ /* 5 entries from PRD 6.4 */ ];
export const COMPARE = { columns: [...], rows: [...] }; // PRD 6.5
export const STEPS = [...];                              // PRD 6.6
export const ADDONS = {...};                             // PRD 6.7
export const FAQ = [...];                                // PRD 6.9
export const TESTIMONIALS = [...];                       // PRD 6.10
```

### 3.4 WhatsApp helper (`lib/whatsapp.ts`)

```ts
import { CONTACT } from "@/content/site";

export const packageEnquiryUrl = (shortName: string, priceWhatsApp: string) => {
  const text =
    `Hi Ganpati Events,\n` +
    `I am interested in the ${shortName} Collection – ${priceWhatsApp}.\n` +
    `I would like to check availability for my birthday event.\n` +
    `Date:\n` +
    `Location:`;
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(text)}`;
};

export const helpChoosingUrl = () => {
  const text =
    `Hi Ganpati Events,\n` +
    `I need help choosing the right birthday decoration package.\n` +
    `Date:\n` +
    `Location:\n` +
    `Budget:`;
  return `${CONTACT.whatsappBase}?text=${encodeURIComponent(text)}`;
};
```

**Test:** the generated URLs must decode to exactly the messages in PRD Section 8 (including the en dash and ₹). Add a small unit test for both builders.

## 4. Fidelity Procedure (Critical: Do This First)

The text extraction of the live site does not contain styling or media. The agent must collect that data directly from the live site **before writing components**.

1. **Open the live URL in Antigravity's browser** at two viewports: mobile (390 × 844) and desktop (1440 × 900).
2. **Screenshot every section** at both sizes. Save to `/docs/reference/` and use them as the visual reference for the whole build.
3. **Extract design tokens** with DevTools or the browser agent:
   - Colour palette (backgrounds, text, accents, badge colours, button colours, gradients), as hex or HSL.
   - Font families, weights, sizes and line-heights for H1, H2, H3, body, buttons, pills and badges.
   - Spacing scale, container max-width, section padding, border radii, shadows, borders.
   - Record all of it in `app/globals.css` as CSS variables and map them into `tailwind.config`.
4. **Download all images** (logo, hero, every gallery photo) from the Network tab or the page source. Save them in `/public/images/` in DOM order, with clear names (`hero.jpg`, `elite-01.jpg` and so on). Do not recompress them destructively. Record each image's natural width and height.
5. **Document behaviours** by interacting with the live site: how a package card opens (accordion or modal), the default open or closed state, the lightbox (arrows, swipe, close), the FAQ (accordion or static cards), the sticky or floating contact buttons (which breakpoints, scroll behaviour), hover and focus states, scroll animations, and the pill-to-anchor scroll behaviour (smooth scroll, offset for any sticky header).
6. **Confirm the section order and the gallery contents** per package against PRD Section 5.2 and 5.5. Update the PRD notes if the live site differs.
7. Save findings in `/docs/reference/notes.md`.

## 5. Component Specs

| Component | Notes |
|---|---|
| `Header` | Logo image + "Ganpati Events" text, Instagram and WhatsApp links. Replicate sticky or static behaviour from the live site. |
| `Hero` | H1, subtext, label, price range, hero image, 5 pills linking to `#id`. |
| `About` | H2, intro line, four feature items. |
| `Packages` | H2 "Choose your package", helper line, five `PackageCard`s, each with `id` equal to the package id (anchor target; add `scroll-margin-top` if the header is sticky). |
| `PackageCard` (client) | Collapsed state shows name, tagline, best-for, price and badges. Expanded state shows features, gallery and two CTAs. Use `aria-expanded` and `aria-controls`. Match the live default state and animation. |
| `Gallery` / `Lightbox` (client) | Grid of thumbnails, with the lightbox opening on click or Enter. Focus trap, Esc closes, × button, restore focus on close. Alt text per PRD 5.5; lightbox image alt "Enlarged photo". |
| `CompareTable` | Real `<table>` with `<thead>` and `<th scope>`. Wrapped in a container with `overflow-x: auto` so only the table scrolls. Swipe hint above or below, as on the live site. Optionally a sticky first column if the live site has it. |
| `BookingSteps` | Five numbered steps "01" to "05". |
| `AddOns` | Three photography options (price, description, sample links), plus the Sound add-on. External links use `target="_blank"` and `rel="noopener noreferrer"` if the live site does so. |
| `Faq` | Replicate the live structure. If accordion: native `<details>` or an accessible button + panel. |
| `Testimonials` | Three quotes with the curly quotation marks and names exactly as in the PRD. |
| `FinalCta`, `Footer`, `FloatingContact` | Per PRD 6.11 to 6.13. |

## 6. Styling Rules

- Tailwind utility classes, with tokens from the extraction step. **Do not guess colours or fonts; read them from the live site.**
- Mobile-first, with breakpoints matching the live site's layout shifts.
- Body must not scroll horizontally. Wide content (the table) scrolls within its own container.
- Respect `prefers-reduced-motion` for any animation.
- Light and dark mode: only if the live site implements it. Otherwise ship light only.
- Use `100%` or `dvh` sizing carefully and honour mobile safe areas for the bottom floating buttons (`env(safe-area-inset-bottom)`).

## 7. Metadata

```ts
// app/layout.tsx
export const metadata = {
  title: "Ganpati Events — Birthday Decoration Packages",
};
```
Set `<html lang="en">` (or match the live site). Add nothing else (no description, no OG, no schema) in this phase. These are Phase 2 items per the PRD.

## 8. Accessibility

- One `<h1>`; headings follow the page hierarchy in the PRD.
- All interactive elements are reachable by keyboard and have visible focus rings.
- Cards and accordions use proper ARIA states. The lightbox is a dialog (`role="dialog"`, `aria-modal`, labelled).
- Links that open in a new tab are announced appropriately if the live site does so.
- Emoji used decoratively should not break screen-reader flow. Keep them in the text, since the PRD requires identical content.

## 9. Performance

- `next/image` with explicit width/height, `sizes` set per layout, `priority` only for the hero image and logo.
- Lazy-load all gallery images and the lightbox's large versions.
- Self-host fonts via `next/font` with `display: swap`.
- No third-party scripts. Keep the JS bundle small, since only the card, gallery and lightbox components are client-side.
- Targets: Lighthouse mobile Performance, Accessibility and Best Practices all 90 or higher; CLS under 0.1.

## 10. Testing and QA

1. **Content diff:** render the page and compare `innerText` against the live site's `innerText` (script or manual). The result must be identical, including the PRD Section 9 quirks.
2. **Link check:** script that lists every `href` on the page and compares it with the PRD's link list. Click-test the WhatsApp links.
3. **Visual regression:** compare screenshots against `/docs/reference/` at 360, 390, 768, 1024, 1280 and 1536 px.
4. **Unit tests:** `lib/whatsapp.ts` outputs.
5. **Browser pass:** Chrome, Safari (iOS), Firefox and Edge.
6. **Lighthouse and accessibility run** (for example axe) before handoff.

## 11. Deployment

- `pnpm build` must pass with no errors or warnings (lint and type-check included).
- Deploy to Vercel (default). For Netlify, use the standard Next.js adapter, with no code changes.
- Environment variables: none.
- After deploy, repeat the QA checks on the production URL.

## 12. Delivery Milestones

| # | Milestone | Done when |
|---|---|---|
| 1 | Reference capture | Screenshots, tokens, images and behaviour notes saved in `/docs/reference/` |
| 2 | Scaffold | Next.js + Tailwind + fonts + tokens + `content/site.ts` complete |
| 3 | Static sections | Header through Footer render with correct content and layout |
| 4 | Interactions | Cards, galleries, lightbox, FAQ, floating buttons working |
| 5 | Fidelity pass | Visual and text diffs clean at all breakpoints |
| 6 | Hardening | Accessibility, performance, QA and deploy |

## 13. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Agent "improves" copy or fixes the typos | PRD Section 9 lists the quirks to preserve. Run the text-diff test. |
| Colours, fonts or animations guessed wrongly | Mandatory extraction (Section 4). Visual regression against screenshots. |
| Images missed or in the wrong order | Download in DOM order and verify counts per package (Elite 7, Signature 9, others per the live site). |
| WhatsApp message encoding errors (en dash, ₹, line breaks) | Unit test the builders and check them in WhatsApp Web. |
| Unknown package-card behaviour | Document it in Section 4, step 5, before building `PackageCard`. |

---

## Appendix — Antigravity Kickoff Prompt

Paste this into Antigravity, with `PRD.md` and `TRD.md` in the project root:

```
You are building a Next.js (App Router, TypeScript, Tailwind) clone of
https://ganpatieventsjodhpur.netlify.app/ .

Read PRD.md and TRD.md fully before doing anything.

Rules:
1. The result must be an EXACT clone: identical copy, prices, links, section order,
   layout, colours, fonts, images and interactions. Do not change, fix or improve any
   content. Preserve the quirks listed in PRD Section 9.
2. First, follow TRD Section 4: open the live site in the browser at mobile and
   desktop sizes, take screenshots, extract design tokens, download all images, and
   document the interactions. Save everything in /docs/reference/.
3. Put all copy in content/site.ts exactly as in PRD Section 6. Components must not
   hardcode copy.
4. Build the WhatsApp links with lib/whatsapp.ts so the decoded messages match PRD
   Section 8 exactly.
5. Do not add features, SEO extras, analytics, forms, or a backend.
6. When done, run the QA steps in TRD Section 10 and give me a short report listing
   any place where the live site differs from the PRD.
```
