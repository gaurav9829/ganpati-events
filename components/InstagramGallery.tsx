"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Instagram, ExternalLink } from "lucide-react";

export interface InstagramPostItem {
  url: string;
  title?: string;
}

interface InstagramGalleryProps {
  posts: InstagramPostItem[];
  /** Whether the parent package card is expanded. Iframes only mount while expanded. */
  expanded?: boolean;
}

/** Distance (px) around the viewport in which embed iframes are kept alive. */
const MOUNT_MARGIN = 600;
/** How long a loaded embed stays alive after scrolling away / collapsing. */
const UNMOUNT_DELAY_MS = 12_000;
/** Shorter delay when the parent card is collapsed (animation out ≈250ms). */
const COLLAPSE_DELAY_MS = 1_200;

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

/**
 * Instagram embeds are extremely memory heavy (~20-40MB each for their JS
 * context + media). Rendering every post upfront historically pushed this page
 * to 800-900MB of tab memory. Strategy here:
 *
 *  1. Only mount the <iframe> when the card is inside the viewport (+margin)
 *     AND the parent package card is expanded.
 *  2. Unmount iframes after a short debounce once they leave the viewport or
 *     the card is collapsed, releasing that memory again.
 *  3. A cheap skeleton shell + outbound link stays in the DOM at all times
 *     (SEO + tap-to-open without waiting for the embed).
 */
export default function InstagramGallery({ posts, expanded = true }: InstagramGalleryProps) {
  const [active, setActive] = useState<Record<number, boolean>>({});
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  // Refs mirror latest state/callback values for use inside the observer.
  const expandedRef = useRef(expanded);
  const activeRef = useRef<Record<number, boolean>>({});
  const unmountTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const cardEls = useRef(new Map<number, HTMLElement>());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setActiveIdx = useCallback((idx: number, value: boolean) => {
    activeRef.current[idx] = value;
    setActive((prev) => {
      if (Boolean(prev[idx]) === value) return prev;
      const next = { ...prev };
      if (value) next[idx] = true;
      else delete next[idx];
      return next;
    });
    if (!value) {
      setLoaded((prev) => {
        if (!prev[idx]) return prev;
        const next = { ...prev };
        delete next[idx];
        return next;
      });
    }
  }, []);

  const clearTimer = useCallback((idx: number) => {
    const t = unmountTimers.current[idx];
    if (t) {
      clearTimeout(t);
      delete unmountTimers.current[idx];
    }
  }, []);

  const scheduleUnmount = useCallback(
    (idx: number, delay: number) => {
      if (unmountTimers.current[idx]) return;
      unmountTimers.current[idx] = setTimeout(() => {
        delete unmountTimers.current[idx];
        setActiveIdx(idx, false);
      }, delay);
    },
    [setActiveIdx]
  );

  /** Same geometric rule as the observer's rootMargin, used manually on expand. */
  const isNearViewport = useCallback((el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const m = MOUNT_MARGIN;
    return !(
      r.bottom < -m ||
      r.top > window.innerHeight + m ||
      r.right < -m ||
      r.left > window.innerWidth + m
    );
  }, []);

  // Observe each card. Mounts/unmounts iframes as they enter/leave the
  // viewport margin — but only ever while the parent card is expanded.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const idx = Number(el.dataset.igIndex ?? "-1");
          if (idx < 0) continue;

          if (entry.isIntersecting) {
            clearTimer(idx);
            if (expandedRef.current && !activeRef.current[idx]) setActiveIdx(idx, true);
          } else if (activeRef.current[idx]) {
            scheduleUnmount(idx, UNMOUNT_DELAY_MS);
          }
        }
      },
      { rootMargin: `${MOUNT_MARGIN}px` }
    );
    observerRef.current = observer;

    cardEls.current.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [clearTimer, scheduleUnmount, setActiveIdx]);

  // React to the parent card opening/closing.
  useEffect(() => {
    expandedRef.current = expanded;

    if (!expanded) {
      // Collapse: release every embed (after the out-animation finishes).
      Object.keys(activeRef.current).forEach((k) =>
        scheduleUnmount(Number(k), COLLAPSE_DELAY_MS)
      );
      return;
    }

    // Expand: cancel pending unmounts, then mount anything already near the
    // viewport (the observer may not re-fire for cards it already saw).
    Object.values(unmountTimers.current).forEach(clearTimeout);
    unmountTimers.current = {};
    cardEls.current.forEach((el, idx) => {
      if (!activeRef.current[idx] && isNearViewport(el)) setActiveIdx(idx, true);
    });
  }, [expanded, isNearViewport, scheduleUnmount, setActiveIdx]);

  // Track card elements for observing (callaback ref, works with React 18).
  const setCardRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      if (el) {
        cardEls.current.set(idx, el);
        observerRef.current?.observe(el);
      } else {
        const old = cardEls.current.get(idx);
        if (old) {
          observerRef.current?.unobserve(old);
          cardEls.current.delete(idx);
        }
      }
    },
    []
  );

  if (!posts || posts.length === 0) return null;

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
          const isActive = Boolean(active[idx]);
          const isLoaded = Boolean(loaded[idx]);

          return (
            <div
              key={idx}
              ref={setCardRef(idx)}
              data-ig-index={idx}
              className="flex-shrink-0 w-[290px] sm:w-[320px] h-[460px] rounded-2xl overflow-hidden border border-line bg-surface shadow-sm snap-start relative flex flex-col justify-between"
            >
              {/* Loading Skeleton (also shown while a far-away embed is released) */}
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

              {/* Instagram Embed Iframe — mounted only while near the viewport */}
              {isActive && (
                <iframe
                  src={embedUrl}
                  title={post.title || `Instagram post ${idx + 1}`}
                  className="w-full h-full border-0 relative z-10 bg-transparent"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  onLoad={() =>
                    setLoaded((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }))
                  }
                />
              )}

              {/* Bottom Quick Link */}
              <div className="bg-[#FAF7F2] border-t border-line px-3 py-1.5 flex items-center justify-between z-20 text-[11px]">
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
