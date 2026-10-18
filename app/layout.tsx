import type { Metadata, Viewport } from "next";
import Script from "next/script";
import JsonLd from "@/components/seo/JsonLd";
import { fullSeoGraph } from "@/lib/schema";
import { SITE } from "@/lib/seo";
import "./globals.css";

const siteUrl = new URL(SITE.url);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: SITE.title, // exact title required by the PRD
  description: SITE.description,
  applicationName: SITE.name,
  category: "Event Planning",
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: SITE.locale,
    images: [
      {
        url: SITE.images.og,
        width: 1200,
        height: 630,
        alt: "Ganpati Events — Premium Birthday Decoration Packages in Jodhpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.images.og],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon-32.png"],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: SITE.shortTitle,
    statusBarStyle: "default",
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jodhpur",
    "geo.position": "26.2389;73.0243",
    ICBM: "26.2389;73.0243",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: SITE.themeColor,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-text antialiased font-sans">
        {children}
        <JsonLd data={fullSeoGraph()} />
        <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
