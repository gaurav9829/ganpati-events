import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ganpati Events — Birthday Decoration Packages",
    short_name: "Ganpati Events",
    description: SITE.description,
    id: SITE.url,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "en-IN",
    dir: "ltr",
    background_color: SITE.backgroundColor,
    theme_color: SITE.themeColor,
    categories: ["business", "shopping", "events"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Book on WhatsApp",
        description:
          "Chat with Ganpati Events to check availability for your birthday event.",
        url: "https://wa.me/919351975852",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "See Packages",
        description: "Compare all five decoration packages.",
        url: "/#packages",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
