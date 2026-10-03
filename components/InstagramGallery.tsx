"use client";

import { useState } from "react";
import { Instagram, ExternalLink } from "lucide-react";

export interface InstagramPostItem {
  url: string;
  title?: string;
}

interface InstagramGalleryProps {
  posts: InstagramPostItem[];
}

function getInstagramEmbedUrl(url: string): string {
  if (url.includes("/embed")) return url;
  const cleanUrl = url.split("?")[0].replace(/\/+$/, "");
  if (cleanUrl.includes("/reel/") || cleanUrl.includes("/p/")) {
    return `${cleanUrl}/embed/`;
  }
  if (!cleanUrl.includes("/")) {
    return `https://www.instagram.com/p/${cleanUrl}/embed/`;
  }
  return `${cleanUrl}/embed/`;
}

export default function InstagramGallery({ posts }: InstagramGalleryProps) {
  const [loadedStates, setLoadedStates] = useState<Record<number, boolean>>({});

  if (!posts || posts.length === 0) return null;

  const handleIframeLoad = (idx: number) => {
    setLoadedStates((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 px-0.5">
        <div className="flex items-center gap-1.5">
          <Instagram className="w-4 h-4 text-[#E1306C]" />
          <span className="text-[12.5px] font-bold text-gold-deep">
            Instagram Posts ({posts.length})
          </span>
        </div>
        <span className="text-[11px] text-muted">
          👉 Swipe to view more
        </span>
      </div>

      <div className="pkg-instagram-posts flex gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth snap-x">
        {posts.map((post, idx) => {
          const embedUrl = getInstagramEmbedUrl(post.url);
          const isLoaded = loadedStates[idx];

          return (
            <div
              key={idx}
              className="flex-shrink-0 w-[290px] sm:w-[320px] h-[460px] rounded-2xl overflow-hidden border border-line bg-surface shadow-sm snap-start relative flex flex-col justify-between"
            >
              {/* Loading Skeleton */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-surface/80 flex flex-col items-center justify-center p-4 z-0 animate-pulse text-center">
                  <Instagram className="w-8 h-8 text-[#E1306C] opacity-70 mb-2 animate-bounce" />
                  <p className="text-[12px] text-muted font-medium">Loading Instagram Post...</p>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-[11.5px] text-emerald-deep font-semibold underline flex items-center gap-1"
                  >
                    Open directly on Instagram <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Instagram Embed Iframe */}
              <iframe
                src={embedUrl}
                title={post.title || `Instagram post ${idx + 1}`}
                className="w-full h-full border-0 relative z-10 bg-transparent"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                onLoad={() => handleIframeLoad(idx)}
              />

              {/* Bottom Quick Link */}
              <div className="bg-[#FAF7F2] border-t border-line px-3 py-1.5 flex items-center justify-between z-10 text-[11px]">
                <span className="text-muted truncate max-w-[190px]">
                  {post.title || "Ganpati Events Setup"}
                </span>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wine font-bold flex items-center gap-0.5 hover:underline shrink-0"
                >
                  View <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
