# SEO / AEO Implementation Notes — Ganpati Events

Everything added for search-engine (SEO) and answer-engine (AEO) optimisation,
where it lives, and what to do before the site goes live.

---

## 1. What was added

|File / route|Type|Purpose|
|---|---|---|
|`lib/seo.ts`|Config|Single source of truth: production URL, title, description, keywords, brand image paths, geo data|
|`lib/schema.ts`|Code|Builds the full schema.org `@graph` JSON-LD (see §3)|
|`components/seo/JsonLd.tsx`|Component|Renders the JSON-LD `<script>` safely (escapes `<`)|
|`app/layout.tsx`|Page|Full metadata: title, description, keywords, canonical, robots, Open Graph, Twitter card, geo tags, theme-color, manifest + icon links|
|`app/sitemap.ts`|Route|Generates **`/sitemap.xml`** (auto-updates `lastModified` at build time)|
|`app/robots.ts`|Route|Generates **`/robots.txt`** (allow all, sitemap + host declared)|
|`app/manifest.ts`|Route|Generates **`/manifest.webmanifest`** (PWA install + WhatsApp / Packages shortcuts)|
|`public/llms.txt`|Static|**AEO file** — machine-readable summary for AI answer engines (ChatGPT, Perplexity, Gemini, Claude)|
|`public/humans.txt`|Static|Classic project-colophon file|
|`public/og-image.jpg`|Asset|1200x630 share image (generated from the hero photo)|
|`public/favicon-32.png`, `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png`, `app/favicon.ico`|Assets|Favicons of every size, from the logo|
|`scripts/generate-branded-images.ps1`|Script|Re-generates all icon/OG assets from `public/images/logo.jpeg` + `hero.jpeg` (`npm run seo:images`)|
|`next.config.js`|Config|Security headers (nosniff, referrer-policy, permissions-policy), `poweredByHeader: false`, long-lived image cache|

## 2. Metadata rendered on `/`

- `<title>` = `Ganpati Events — Birthday Decoration Packages` (kept **exactly** per PRD 5.1)
- Meta description (~155 chars) + keyword list
- Canonical URL via `metadataBase` (`alternates.canonical = "/"`)
- `robots` / `googlebot`: index, follow, `max-snippet:-1`, `max-image-preview:large`, `max-video-preview:-1`
- Open Graph: type, url, site_name, locale `en_IN`, title, description, 1200x630 image + alt/dimensions
- Twitter: `summary_large_image` card with the same image
- Geo tags: `geo.region` IN-RJ, `geo.placename` Jodhpur, `geo.position` / ICBM coordinates
- `theme-color` #B8862E, PWA/apple-web-app meta, apple-touch-icon, favicons
- One JSON-LD script with the full `@graph`

## 3. Structured data (JSON-LD `@graph`)

All entities are cross-linked with `@id` so Google / Bing / AI engines see one
consistent entity tree:

1. **LocalBusiness** — name, address (Magra Punjla, Jodhpur), phone, geo circle (20 km), priceRange, logo/hero images, sameAs Instagram, contactPoint (EN/HI), slogan, `knowsAbout`
2. **WebSite** — publisher link to the business
3. **WebPage** — with **`speakable`** selectors (`h1`, `#faq`, `#packages`) for voice assistants (AEO)
4. **BreadcrumbList**
5. **FAQPage** — all 11 questions, copied verbatim from the visible FAQ section
6. **HowTo** — the 5 booking steps
7. **ItemList of Services** — the 5 packages with INR prices and anchor URLs (`#essential`... `#signature`)

Rules followed: schema text matches visible page text; no fabricated ratings,
reviews, opening hours or addresses that don't appear on the page.

## 4. Before going to production (checklist)

1. **Update the domain** — edit `PROD_URL` in `lib/seo.ts` to the real domain. Everything (canonical, OG, sitemap, robots, JSON-LD) derives from it. Also update the link in `public/llms.txt` (§Pages).
2. Deploy, then verify in production:
   - Google Rich Results Test on `/` (FAQPage, HowTo, breadcrumb, LocalBusiness)
   - `https://<domain>/sitemap.xml` and `/robots.txt` load correctly
   - Google Search Console → add property → submit `/sitemap.xml`
   - Bing Webmaster Tools → import from Search Console
3. Optional additions once the accounts exist (not placeholders to avoid empty tags):
   - `verification: { google: "…", other: { "msvalidate.01": "…" } }` in `lib/seo.ts`
   - Google Business Profile → link it from the Instagram bio so Google can reconcile the entity
4. If the logo / hero images change, re-run `npm run seo:images` before deploy.

## 5. Files untouched (per PRD Phase-1 rules)

No visible page copy, prices, links, section order or layout was changed.
The PRD listed these as Phase-2 items; they were added in this phase on explicit
user request. All page text renders identically to before — the metadata and
JSON-LD are invisible to the content-diff acceptance criteria.
