"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/content/site";

/**
 * Scroll behaviour
 *  - rAF-throttled (one direction-check per frame, never per scroll event)
 *  - accumulated deltas with hysteresis → no jitter/flicker on momentum scroll
 *  - hides the whole bar after the hero when scrolling down, reveals on scroll up
 *  - always visible near the top; gold accents once the page is scrolled
 */
const SHOW_AT_TOP = 24; // px — always pinned this close to the top
const REVEAL_AFTER = 240; // px — only hide once we are past the hero intro
const SHOW_DELTA = 8; // upward px accumulated that reveal the bar
const HIDE_DELTA = 14; // downward px accumulated that hide the bar

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let acc = 0; // signed, accumulated scroll delta since last direction change
    let raf = 0;

    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;

      // Scroll progress hairline (direct style write — no re-render per frame)
      if (progressRef.current) {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        progressRef.current.style.transform = `scaleX(${p})`;
      }

      if (y <= SHOW_AT_TOP) {
        acc = 0;
        setHidden(false);
        return;
      }

      // Restart the accumulator when the direction flips
      if ((acc >= 0 && dy < 0) || (acc <= 0 && dy > 0)) acc = 0;
      acc += dy;

      if (acc <= -SHOW_DELTA) {
        setHidden(false);
        acc = 0;
      } else if (acc >= HIDE_DELTA && y > REVEAL_AFTER) {
        setHidden(true);
        acc = 0;
      }
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    // Recalculate when the tab becomes visible again (scroll restore etc.)
    const onVisibility = () => {
      if (!document.hidden && !raf) raf = window.requestAnimationFrame(tick);
    };

    setScrolled(lastY > 8);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`topbar sticky top-0 z-30 flex items-center justify-between max-w-2xl mx-auto w-full px-4 py-2.5 border-b backdrop-blur-[10px] transition-[transform,background-color,box-shadow,border-color] duration-300 motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-[rgba(251,246,236,0.97)] border-[rgba(184,134,46,0.45)] shadow-[0_2px_14px_rgba(138,95,22,0.16)]"
          : "bg-[rgba(251,246,236,0.9)] border-line shadow-none"
      }`}
    >
      <div className="topbar-brand flex items-center gap-2.5 min-w-0">
        <Image
          src="/images/logo.jpeg"
          alt="Ganpati Events logo"
          width={36}
          height={36}
          className="w-9 h-9 object-cover rounded-full shadow-sm border border-line shrink-0"
          priority
          unoptimized
        />
        <span className="font-serif text-lg sm:text-xl font-bold tracking-wide text-text truncate">
          Ganpati Events
        </span>
      </div>

      <a
        href={CONTACT.whatsappBase}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-colors duration-200 active:scale-95 shrink-0"
        aria-label="WhatsApp Us"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>WhatsApp</span>
      </a>

      {/* Gold scroll-progress hairline */}
      <div
        ref={progressRef}
        className="pointer-events-none absolute left-0 right-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold-deep via-gold to-gold-light"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />
    </header>
  );
}
