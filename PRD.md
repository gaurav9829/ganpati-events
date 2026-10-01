# PRD — Ganpati Events Website (Next.js Rebuild)

**Project:** Ganpati Events — Birthday Decoration Packages, Jodhpur
**Reference (source of truth):** https://ganpatieventsjodhpur.netlify.app/
**Goal in one line:** Rebuild the existing single-page site in Next.js as a pixel-faithful, content-identical clone. **No content, copy, price, link, or layout changes.**
**Companion doc:** `TRD.md` (technical requirements and build instructions)

---

## 1. Background

Ganpati Events is a Jodhpur-based decoration, photography and sound business for birthdays and celebrations. The current site is a single-page, mobile-first catalogue: visitors compare five decoration packages and book through WhatsApp. There is no backend, no form, no payment and no login. Every conversion is a WhatsApp chat, a phone call, or an Instagram visit.

The site is being migrated to Next.js so it can be maintained, extended and deployed on a modern stack. This phase is a **faithful migration only**.

## 2. Objectives

1. Reproduce the live site exactly in Next.js (App Router).
2. Keep all text, prices, links, emojis, section order and interactions identical to the live site.
3. Keep WhatsApp, Call and Instagram as the only conversion paths.
4. Ship a fast, responsive, accessible build that looks the same as the original at every breakpoint.

## 3. Non-Goals (do NOT do these)

- Do not rewrite, fix, shorten, improve or "clean up" any copy. This includes typos and inconsistencies (see Section 9).
- Do not add new sections, pages, forms, a CMS, a database, analytics, a blog, or booking logic.
- Do not change prices, package contents, links, phone numbers or WhatsApp prefilled messages.
- Do not redesign colours, fonts, spacing or layout. Match the live site.
- Do not add SEO or AEO extras (meta description, schema and so on) in this phase. Only keep the page title exactly as in Section 5.1.

## 4. Users and Primary Journeys

**Audience:** Parents and family members in Jodhpur (and within 20 km) planning a birthday, mostly on mobile phones.

| Journey | Steps |
|---|---|
| Book a package | Land on the page, scan the package pills, open a package, tap "📅 Check Availability on WhatsApp", land in WhatsApp with a prefilled message |
| Compare | Scroll to "Compare at a glance", swipe the table sideways |
| Get help | Tap "💬 Chat With Us" and open WhatsApp with the help message |
| Add services | Read the add-ons, open the photography sample links |
| Trust check | Read the client testimonials and visit Instagram |
| Quick contact | Tap Call Now or WhatsApp from any CTA, header or footer |

## 5. Functional Requirements

### 5.1 Global
- **Page title (exact):** `Ganpati Events — Birthday Decoration Packages`
- Viewport: `width=device-width, initial-scale=1.0`
- Single page, one route (`/`).
- In-page anchors: `#essential`, `#elegant`, `#elite`, `#luxury`, `#signature`. Each package card must carry its anchor id, and the package pills must scroll to it.
- All external links open as on the live site (WhatsApp, Instagram, Drive and camtom links).
- Contact constants:
  - WhatsApp number: `919351975852` (base link `https://wa.me/919351975852`)
  - Phone: `tel:+919351975852`
  - Instagram: `https://www.instagram.com/expert_birthday_setup/`

### 5.2 Section order (top to bottom)
1. Header
2. Hero
3. About Ganpati Events
4. Choose your package (5 package cards)
5. Compare at a glance (table)
6. How Your Booking Works (5 steps)
7. Add-on services
8. Need Help Choosing a Package?
9. Good to know (FAQ)
10. What our clients say
11. Final CTA — Ready to Plan Your Birthday Celebration?
12. Footer — Ready to plan the celebration?
13. Floating or bottom contact buttons (WhatsApp / Call Now)
14. Photo lightbox (enlarged photo, close with ×)

### 5.3 Interactions
- **Package cards:** the helper line says "Tap a package to see the full list, photos, and enquire." Each package card is tappable and expands (or opens) to reveal its full feature list, photo gallery (where present) and the two CTA buttons. **Verify the exact expand/modal behaviour and the default open state on the live site and replicate it.**
- **Package pills (hero):** five pill links (name plus price) that jump to the matching package card.
- **Photo gallery and lightbox:** tapping a gallery image opens an enlarged view with a × close control. Image alt text in the lightbox is "Enlarged photo".
- **Comparison table:** horizontally scrollable on small screens, with the hint "👉 Swipe left/right → to compare packages". The page body must never scroll sideways.
- **CTAs:** every WhatsApp button uses the exact prefilled message from Section 8.

### 5.4 Visual fidelity
The text capture of the live site does not include colours, fonts, spacing, animations or images. **The build agent must open the live URL in a browser (desktop and mobile viewport), inspect computed styles, and replicate them exactly.** See `TRD.md`, Section 4, for the extraction procedure.

### 5.5 Images
- Header logo ("Ganpati Events logo").
- One hero image (alt "Ganpati Events").
- **Elite Collection gallery:** 7 images (alt "Elite Collection setup").
- **Signature Collection gallery:** 9 images (alt "Signature Collection setup").
- Essential, Elegant and Luxury showed no gallery images in the text capture. **Check the live site and replicate whatever exists there.**
- Download every image from the live site and keep it in `/public/images/`, preserving filenames where possible.

## 6. Content (Verbatim, Do Not Alter)

> Reproduce every string below character for character, including punctuation, emojis, capitalisation, spacing and the ₹ / "Rs." formats as written. If this appendix and the live site ever differ, the live site wins, and flag the difference in the build report.

### 6.1 Header
- Logo image + text: **Ganpati Events**
- Links: **Instagram** → `https://www.instagram.com/expert_birthday_setup/`, **WhatsApp** → `https://wa.me/919351975852`

### 6.2 Hero
- H1: **Turning your imagination into a royal birthday celebration**
- Subtext: Choose your package, check your date & book directly on WhatsApp.
- Label: Premium Birthday Decoration Packages in Jodhpur
- Price range: ₹14,000 – ₹25,000
- Package pills (link to anchors):
  - Essential **Rs.14,000** → `#essential`
  - Elegant **Rs.16,000** → `#elegant`
  - Elite **Rs.20,000** → `#elite`
  - Luxury **Rs.25,000** → `#luxury`
  - Signature **Rs.25,000** → `#signature`

### 6.3 About Ganpati Events (H2)
Intro: Jodhpur-based decoration, photography and sound for birthdays and celebrations.

| H3 | Text |
|---|---|
| Creative themes | Theme-based décor designed around the occasion. |
| Premium execution | Planned setup, styling and on-ground coordination. |
| Personalised details | Name, number, photos and stage elements customised for the celebration. |
| One event partner | Decoration, photography and sound can be arranged as separate services. |

### 6.4 Choose your package (H2)
Helper: Tap a package to see the full list, photos, and enquire.

Each card shows: name, tagline, "Best for", price, and optional badge. Expanded content: feature list, photos, then the two buttons:
- `📸 View More Work on Instagram @expert_birthday_setup` → Instagram URL
- `📅 Check Availability on WhatsApp` → prefilled WhatsApp link (Section 8)

#### Essential Collection — Rs. 14,000 (`#essential`)
- Tagline: A clean, festive setup for an intimate celebration.
- Best for: Intimate birthday
- Features:
  - 3 Backdrops – Butterfly / Prince / Jungle Theme
  - 1 Balloon Entrance Gate
  - 1 Welcome Board
  - Baby Trolley – Optional
  - 6 Theme Cutout Balloon Stands
  - 8 Balloon Drop Entry OR 8 Cold-Fire Entry — Choose 1
  - Birthday Light
  - All-over Extra Decoration
  - Normal Flower Decor
  - 4 Flash Lights on Decoration
  - Matting
  - In-light Butterfly / Wooden Butterfly / In-light Flower
  - 1 Number in Light
  - Cake Cutting Drum

#### Elegant Collection — Rs. 16,000 (`#elegant`) — badge: ⭐ Most Booked
- Tagline: More backdrop coverage, a dedicated table, brighter accents.
- Best for: Medium-size celebration
- Features:
  - 4 Backdrops in Any Theme
  - 1 Balloon Entrance Gate
  - 1 Welcome Board – 2 × 3
  - Baby Trolley – Optional
  - 6 Theme Cutout Balloon Stands
  - 6 Balloon Drop Entries
  - Birthday Light
  - All-over Entry Decoration
  - Normal Flower Decor
  - 5 Flash Lights on Decoration
  - Matting
  - In-light Butterfly / Wooden Butterfly / In-light Flower
  - 1 Number in Light
  - Cake Cutting Drum
  - One Table

#### Elite Collection — Rs. 20,000 (`#elite`)
- Tagline: A full stage setup with personalised name and photo displays.
- Best for: Bigger stage setup
- Features:
  - 4–5 Backdrops in Any Theme, 20–25 Foot Stage
  - 1 Balloon Entrance Gate
  - 1 Welcome Board – 2 × 3
  - Baby Trolley – Optional
  - 6 Theme Cutout Balloon Stands
  - 6 Balloon Drop Entries
  - Birthday Light
  - All-over Entry Decoration
  - Normal Flower Decor
  - 6 Flash Lights on Decoration
  - Matting
  - In-light Butterfly / Wooden Butterfly
  - 1 Number in Light
  - Cake Cutting Drum
  - One Table
  - In-light Flower
  - Baby Name in Light
  - 6 Baby Photos
- Gallery: 7 images, alt "Elite Collection setup"

#### Luxury Collection — Rs. 25,000 (`#luxury`) — badge: GRAND CELEBRATION
- Tagline: The royal treatment — six backdrops, a 30-foot stage, a costumed character and a bubble entry.
- Best for: Grand birthday
- Features:
  - 6 Backdrops in Any Theme, 30 Foot Stage
  - 1 Balloon Entrance Gate
  - 1 Welcome Board – 2 × 3
  - Baby Trolley – Optional
  - 6–8 Theme Cutout Balloon Stands
  - 8 Balloon Drop Entry OR 8 Cold-Fire Entry — Choose 1
  - Birthday Light
  - All-over Entry Decoration
  - Normal Flower Decor
  - 7 Flash Lights on Decoration
  - Matting
  - In-light Butterfly / Wooden Butterfly
  - 1 Number in Light
  - Cake Cutting Drum
  - One Table
  - In-light Flower
  - Baby Name in Light
  - 6 Baby Photos
  - 1 Teddy Man (Any Character)
  - Bubble Entry with 8 Balloon Drop Entry

#### Signature Collection — Rs. 25,000 (`#signature`) — badges: ⭐ Most Booked, PREMIUM CUSTOM EXPERIENCE
- Tagline: Our most-booked premium setup — a five-backdrop stage with a centrepiece frame.
- Best for: Premium/custom look
- Features:
  - 5 Backdrops in Any Theme
  - 1 Centre 3D Wooden Backdrop
  - 20–25 Foot Stage (as per venue requirement)
  - 1 Wooden Entrance Gate
  - 1 Welcome Board – 2 × 3
  - Baby Trolley – Optional
  - 6–8 Theme Cutout Balloon Stands
  - 6 Balloon Drop Entries
  - Birthday Light
  - Extra Decoration According to Theme
  - Normal Flower Decor
  - 6 Flash Lights on Decoration
  - On-stage Flex according to theme + Matting
  - In-light Butterfly / Wooden Butterfly
  - 1 Number in Light
  - Cake Cutting Drum
  - One Table
  - In-light Flower
  - Baby Name in Light
  - 6 Baby Photos
- Gallery: 9 images, alt "Signature Collection setup"

> **Badge note:** In the text capture, the badge text sat directly after "Best for" with no space (for example "Best for: Grand birthdayGRAND CELEBRATION"). Treat the badges as separate styled labels, not part of the "Best for" string. Confirm placement visually on the live site.

### 6.5 Compare at a glance (H2)
Helper: Scroll sideways to see all five collections.
Swipe hint: 👉 Swipe left/right → to compare packages

| | Essential 14K | Elegant 16K | Elite 20K | Luxury 25K | Signature 25K |
|---|---|---|---|---|---|
| Backdrops | 3 | 4 | 4–5 | 6 | 5 + centre frame |
| Stage | — | — | 20–25 ft | 30 ft | 20–25 ft |
| Entrance gate | Balloon | Balloon | Balloon | Balloon | Wooden |
| Centre backdrop | — | — | — | — | 3D Wooden |
| Balloon stands | 6 | 6 | 6 | 6–8 | 6–8 |
| Balloon / cold-fire entry | 6 | 6 | 6 | 8 Balloon Drop Entry OR 8 Cold-Fire Entry — Choose 1 | 6 |
| Flash lights | 4 | 5 | 6 | 7 | 6 |
| Table | — | One | One | One | One |
| Baby name & photos | — | — | Yes | Yes | Yes |
| Teddy man / bubble entry | — | — | — | Yes | — |
| Best For | Intimate birthday | Medium-size celebration | Bigger stage setup | Grand birthday | Premium/custom look |

### 6.6 How Your Booking Works (H2)
Intro: A simple process from choosing your package to celebration day.

| No. | H3 | Text |
|---|---|---|
| 01 | Choose Your Package | Browse our packages and select your preferred setup. |
| 02 | Check Date Availability | Send us your event date & location on WhatsApp. |
| 03 | Finalise Theme & Details | Theme, colours, name, photos and custom requirements discuss karein. |
| 04 | Advance Payment | Complete the booking formalities shared by our team to confirm your date. |
| 05 | Celebration Day 🎉 | Our team arrives before the event and completes the setup. |

### 6.7 Add-on services (H2)
Intro: Booked separately, on top of any decoration package.

**H3: Photography & Cinematography — choose an option**

| Option | Price | Description | Links |
|---|---|---|---|
| Option 1 | Rs. 12,000 | 1 candid photographer, 1 candid cinematographer, 1 photographer for reel shoot. | Sample 1, Sample 2, Sample 3 |
| Option 2 | Rs. 10,000 | 1 candid photographer, 1 candid cinematographer. | Sample 1, Sample 2, Sample 3 |
| Option 3 | Rs. 7,000 | 1 candid photographer, 1 candidate for 2 reel shoots by iPhone. | View sample photos |

Links:
- Options 1 and 2, Sample 1: `https://drive.google.com/drive/folders/1pB4ygSEsEckU1BscFKiovxlNcbpGzrw-`
- Options 1 and 2, Sample 2: `https://drive.google.com/drive/folders/1vXQ_NwBT6KdYWegw3h3cd7_DL3aZwWFO?usp=sharing`
- Options 1 and 2, Sample 3: `https://camtom.in?eventid=36ttj&event=1XjxJAjTMlMlR1_gVHocw_yWHhZ-pfVv506fpw`
- Option 3, View sample photos: `https://drive.google.com/drive/folders/1_9M5it97Y-gb5JRT5cPsuoqc5F05gzEB`

**H3: Sound — Rs. 3,000**
1 top jodi sound + mic with professional operator.

### 6.8 Need Help Choosing a Package? (H2)
Not sure which package is right for your celebration? Chat with our team and we'll help you choose.
Button: `💬 Chat With Us` → help message (Section 8)

### 6.9 Good to know (H2)
Intro: Quick answers before you message us.

| Question (H3) | Answer |
|---|---|
| Areas we cover | Jodhpur city, plus areas within 20 km of Jodhpur. |
| Setup timing | We arrive and set up 5 to 6 hours before your event starts, so everything is ready well in time. |
| How to book | Tap "Book on WhatsApp", tell us your package and date, and we'll confirm availability and next steps. |
| Getting a reply | We're active on WhatsApp and reply to every enquiry — message us anytime. |
| Do you customise themes? | Yes, theme customisation and requirements are available. Share your theme, colours and requirements with us on WhatsApp. |
| How much advance is required? | Advance amount depends on the selected package and event requirements. Our team will confirm the booking amount while finalising your booking. |
| How far do you travel from Jodhpur? | We cover Jodhpur city and areas within 20 km of Jodhpur. For locations outside this area, please confirm availability with our team. |
| Can I add photography? | Photography and cinematography can be arranged as add-on services. Contact our team for availability and options. |
| Can I customise the package? | Yes, custom requirements are available. Share your theme, colours and requirements on WhatsApp. |
| What happens if my date is not available? | Our team will inform you if the requested date is unavailable, and you can discuss alternative dates or available options. |
| How early should I book? | Early booking is recommended, especially for weekends, peak dates and premium setups. Contact us as soon as your event date is confirmed. |

> Keep the order above. **Verify on the live site** which items are static cards and which are accordions, and replicate that.

### 6.10 What our clients say (H2)
- “Thank you so much guys, you all made my daughter’s day very special.” — Ridhi Madhakar
- “Loved the decoration! Best event management team for decorating moments. Thank you for making it special.” — ca.nirma_
- “Nice arrangements by Ganpati Events — on time and attention to details are their USP. Thanks!” — bissameenu

### 6.11 Final CTA (H2)
**Ready to Plan Your Birthday Celebration? 🎉**
Choose your package, share your date & location, and check availability with Ganpati Events.
Buttons:
- `📅 Check Availability` → `https://wa.me/919351975852`
- `💬 WhatsApp Us` → `https://wa.me/919351975852`
- `📞 Call Now` → `tel:+919351975852`

### 6.12 Footer
- H2: **Ready to plan the celebration?**
- Magra Punjla, Jodhpur • 9351975852
- Instagram: @expert_birthday_setup → Instagram URL
- Buttons: `📞 Call Now` (`tel:+919351975852`), `📸 Instagram` (Instagram URL), `💬 WhatsApp Us` (`https://wa.me/919351975852`)
- Sign-off line: Your Imagination into reality

### 6.13 Bottom or floating contact buttons
- `💬 WhatsApp` → `https://wa.me/919351975852`
- `📞 Call Now` → `tel:+919351975852`

### 6.14 Lightbox
- Close control: ×
- Image alt: Enlarged photo

## 7. Non-Functional Requirements

- **Responsive:** mobile-first. Verify at 360, 390, 768, 1024, 1280 and 1536 px widths against the live site.
- **Performance:** Lighthouse mobile Performance 90 or higher. Use `next/image`, lazy-load the galleries, and use WebP/AVIF where the source allows without visible quality loss.
- **Accessibility:** semantic headings (one H1), keyboard-operable cards and lightbox (focus trap, Esc to close), visible focus states, sufficient contrast as per the original.
- **Browser support:** latest two versions of Chrome, Safari (iOS and macOS), Firefox and Edge, plus Samsung Internet.
- **No console errors or hydration warnings.**

## 8. WhatsApp Prefilled Messages (Exact)

Base: `https://wa.me/919351975852?text=` + URL-encoded message. Line breaks are `\n` (`%0A`). The en dash is `–` (`%E2%80%93`) and the rupee sign is `₹` (`%E2%82%B9`).

**Package enquiry (substitute name and price):**
```
Hi Ganpati Events,
I am interested in the {Name} Collection – ₹{price}.
I would like to check availability for my birthday event.
Date:
Location:
```
| Package | {Name} | {price} |
|---|---|---|
| Essential | Essential | 14,000 |
| Elegant | Elegant | 16,000 |
| Elite | Elite | 20,000 |
| Luxury | Luxury | 25,000 |
| Signature | Signature | 25,000 |

**Help choosing (the "Chat With Us" button):**
```
Hi Ganpati Events,
I need help choosing the right birthday decoration package.
Date:
Location:
Budget:
```

All other WhatsApp buttons use the plain link `https://wa.me/919351975852` with no prefilled text.

## 9. Known Content Quirks (PRESERVE AS-IS)

These exist on the live site. Per the "no changes" brief, **reproduce them exactly**. They are listed so the build agent does not "fix" them by accident.

1. Essential's feature list says "8 Balloon Drop Entry OR 8 Cold-Fire Entry — Choose 1", while the comparison table shows "6".
2. Add-on Option 3 reads "1 candidate for 2 reel shoots by iPhone".
3. Step 03 contains the Hinglish word "karein" inside an English sentence.
4. Price formats vary: "Rs.14,000" (pills), "Rs. 14,000" (cards), "14K" (table), "₹14,000" (WhatsApp text and hero range).
5. FAQ "How to book" mentions a "Book on WhatsApp" button label; the buttons on the page read "Check Availability on WhatsApp".
6. Two cards are tagged "⭐ Most Booked" (Elegant and Signature).
7. Footer sign-off "Your Imagination into reality" and the hero H1 are intentionally different strings.

## 10. Acceptance Criteria

- [ ] Side-by-side visual comparison at all listed breakpoints shows no meaningful difference from the live site.
- [ ] A text diff of rendered copy against the live site shows zero differences (including Section 9 quirks).
- [ ] All links, anchors, `tel:` and WhatsApp URLs match Section 8 and Section 6 exactly. Test each prefilled message in WhatsApp Web.
- [ ] All images are present, sharp and correctly ordered, and the lightbox works on every gallery.
- [ ] The comparison table scrolls sideways inside its container and never causes page-level horizontal scroll.
- [ ] Page title matches exactly.
- [ ] Lighthouse mobile: Performance 90 or higher, Accessibility 90 or higher, Best Practices 90 or higher.
- [ ] Deploys successfully (see `TRD.md`) with no build warnings.

## 11. Out of Scope (Possible Phase 2)

Custom domain, meta description and Open Graph tags, LocalBusiness/FAQ schema, sitemap, Google Business Profile integration, theme-specific landing pages, analytics, and an enquiry form or CMS. **None of these are part of this build.**
