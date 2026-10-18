/**
 * Central SEO / AEO configuration.
 *
 * ⚠️ BEFORE DEPLOYING TO PRODUCTION: update `PROD_URL` to the real domain
 * (e.g. "https://www.ganpatievents.com"). Every generated URL below derives
 * from it, so this is the single place you need to change.
 */

export const PROD_URL = "https://ganpatieventsjodhpur.netlify.app";

export const SITE = {
  url: PROD_URL,
  name: "Ganpati Events",
  title: "Ganpati Events — Birthday Decoration Packages",
  shortTitle: "Ganpati Events",
  description:
    "Ganpati Events creates royal birthday celebrations in Jodhpur. Compare 5 premium decoration packages from Rs.14,000 and book directly on WhatsApp.",
  locale: "en_IN",
  themeColor: "#B8862E",
  backgroundColor: "#FBF5EA",
  keywords: [
    "birthday decoration Jodhpur",
    "birthday decoration packages Jodhpur",
    "birthday event decorator Jodhpur",
    "balanced birthday stage decoration Jodhpur",
    "balloon decoration Jodhpur",
    "birthday backdrop decoration",
    "birthday stage setup Jodhpur",
    "baby name in light decoration",
    "bubble entry birthday decoration",
    "teddy man birthday entertainment",
    "birthday photography Jodhpur",
    "candid photographer Jodhpur",
    "event sound service Jodhpur",
    "birthday party planner Jodhpur",
    "Ganpati Events Jodhpur",
    "birthday decoration near me",
  ],
  images: {
    og: "/og-image.jpg",
    hero: "/images/hero.jpeg",
    logo: "/images/logo.jpeg",
  },
} as const;

/** Absolute URL helper. */
export const absUrl = (path = "/"): string => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean === "/" ? "" : clean}`;
};
