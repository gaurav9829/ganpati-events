/**
 * AEO / Schema.org graph for Ganpati Events.
 *
 * Produces one JSON-LD `@graph` with every entity search and answer engines
 * need (Google, Bing, ChatGPT, Perplexity, Gemini...):
 *   - LocalBusiness  → local pack / Knowledge Panel signals
 *   - WebSite        → site identity
 *   - WebPage        → page depth + `speakable` for voice assistants (AEO)
 *   - FAQPage        → rich results / answer-engine Q&A extraction
 *   - HowTo          → booking-process extraction
 *   - Service        → package catalogue with prices
 *   - BreadcrumbList → structure signals
 *
 * Strings rendered into the JSON-LD (question/answer names, prices, copy)
 * match the visible page content, per Google's structured-data policy.
 */
import { CONTACT, PACKAGES, FAQ, STEPS } from "@/content/site";
import { SITE, absUrl } from "./seo";
const PAGE_URL = absUrl("/");

const BUSINESS_ID = `${PAGE_URL}#business`;
const WEBSITE_ID = `${PAGE_URL}#website`;
const WEBPAGE_ID = `${PAGE_URL}#webpage`;
const FAQ_ID = `${PAGE_URL}#faq`;
const HOWTO_ID = `${PAGE_URL}#howto`;
const PACKAGES_ID = `${PAGE_URL}#packages`;
const BREADCRUMB_ID = `${PAGE_URL}#breadcrumb`;

const NUMERIC_PRICE: Record<string, number> = {
  essential: 14000,
  elegant: 16000,
  elite: 20000,
  luxury: 25000,
  signature: 25000,
};

const geo = { latitude: 26.2389, longitude: 73.0243 };

export const businessSchema = () => ({
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: SITE.name,
  description: SITE.description,
  url: PAGE_URL,
  telephone: "+919351975852",
  image: [
    `${SITE.url}${SITE.images.og}`,
    `${SITE.url}${SITE.images.logo}`,
  ],
  logo: { "@type": "ImageObject", url: `${SITE.url}/images/logo.jpeg` },
  priceRange: "₹14,000 – ₹25,000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Magra Punjla",
    addressLocality: "Jodhpur",
    addressRegion: "Rajasthan",
    addressCountry: { "@type": "Country", name: "IN" },
  },
  geo: { "@type": "GeoCoordinates", ...geo },
  hasMap: `https://www.google.com/maps/search/?api=1&query=Magra+Punjla,+Jodhpur`,
  areaServed: {
    "@type": "GeoCircle",
    geoCenter: { "@type": "GeoCoordinates", ...geo },
    geoRadius: "20000",
    name: "Jodhpur city and areas within 20 km of Jodhpur",
  },
  sameAs: [CONTACT.instagram],
  slogan: "Your Imagination into reality",
  knowsAbout: [
    "Birthday decoration",
    "Balloon decoration",
    "Backdrop and stage setup",
    "Photography and cinematography",
    "Event sound service",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+919351975852",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
});

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: PAGE_URL,
  name: SITE.name,
  alternateName: "Ganpati Events Jodhpur",
  description: SITE.description,
  inLanguage: "en",
  publisher: { "@id": BUSINESS_ID },
});

export const webpageSchema = () => ({
  "@type": "WebPage",
  "@id": WEBPAGE_ID,
  url: PAGE_URL,
  name: SITE.title,
  description: SITE.description,
  inLanguage: "en",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": BUSINESS_ID },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE.url}${SITE.images.og}`,
  },
  significantLink: CONTACT.instagram,
  // AEO: voice assistants / answer engines read the h1 + FAQ first.
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#faq", "#packages"],
  },
  breadcrumb: { "@id": BREADCRUMB_ID },
});

export const breadcrumbSchema = () => ({
  "@type": "BreadcrumbList",
  "@id": BREADCRUMB_ID,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: PAGE_URL },
  ],
});

export const faqSchema = () => ({
  "@type": "FAQPage",
  "@id": FAQ_ID,
  mainEntity: FAQ.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

export const howToSchema = () => ({
  "@type": "HowTo",
  "@id": HOWTO_ID,
  name: STEPS.title,
  description: STEPS.subtext,
  step: STEPS.items.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.desc,
  })),
});

export const packagesSchema = () => ({
  "@type": "ItemList",
  "@id": PACKAGES_ID,
  name: "Premium Birthday Decoration Packages in Jodhpur",
  itemListOrder: "https://schema.org/ItemListUnordered",
  itemListElement: PACKAGES.map((pkg, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: pkg.name,
      description: `${pkg.tagline} ${pkg.bestFor ? `Best for: ${pkg.bestFor}.` : ""}`.trim(),
      serviceType: "Birthday decoration package",
      provider: { "@id": BUSINESS_ID },
      areaServed: "Jodhpur",
      url: `${PAGE_URL}#${pkg.id}`,
      offers: {
        "@type": "Offer",
        price: NUMERIC_PRICE[pkg.id],
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: NUMERIC_PRICE[pkg.id],
          priceCurrency: "INR",
          description: `Starting price — ${pkg.name}`,
        },
        availability: "https://schema.org/InStock",
        url: `${PAGE_URL}#${pkg.id}`,
      },
    },
  })),
});

/** Combined @graph rendered as a single JSON-LD script. */
export const fullSeoGraph = () => ({
  "@context": "https://schema.org",
  "@graph": [
    businessSchema(),
    websiteSchema(),
    webpageSchema(),
    breadcrumbSchema(),
    faqSchema(),
    howToSchema(),
    packagesSchema(),
  ],
});
