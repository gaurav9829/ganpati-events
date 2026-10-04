"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HERO, PACKAGES } from "@/content/site";
import { ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".h-veil", { opacity: 0, duration: 1.4 })
        .from(".h-eyebrow", { y: -18, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(".h-title span", { y: 40, opacity: 0, duration: 0.75, stagger: 0.14 }, "-=0.25")
        .from(".h-chip", { y: 16, opacity: 0, duration: 0.4, stagger: 0.07 }, "-=0.15")
        .from(".h-scroll", { opacity: 0, y: 6, duration: 0.5 }, "-=0.1");
    },
    { scope: containerRef }
  );



  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-end overflow-hidden"
      aria-label="Hero"
    >
      {/* ── VIDEO BACKGROUND ── */}
      <video
        src="/videos/celebration_video.mp4"
        className="absolute inset-0 w-full h-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* ── OVERLAYS ── */}
      {/* Base dark veil */}
      <div className="h-veil absolute inset-0 z-[1] bg-[rgba(8,4,0,0.55)]" />
      {/* Bottom-heavy scrim so text pops */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[rgba(5,2,0,0.9)] via-[rgba(5,2,0,0.35)] to-transparent" />
      {/* Subtle gold tint on left edge */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[rgba(138,95,22,0.18)] to-transparent" />
      {/* Radial gold centre glow */}
      <div
        className="absolute z-[2] pointer-events-none"
        style={{
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 55% at 50% 78%, rgba(184,134,46,0.22) 0%, transparent 70%)",
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 pb-12 pt-24 flex flex-col items-center text-center">

        {/* Eyebrow badge */}
        <div className="h-eyebrow inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-[rgba(228,182,94,0.4)] bg-[rgba(228,182,94,0.1)] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E4B65E] shrink-0 animate-pulse" />
          <span className="text-[#E4B65E] text-[11px] sm:text-xs font-bold tracking-[0.12em] uppercase">
            {HERO.label}
          </span>
        </div>

        {/* Headline — split into spans for per-word GSAP stagger */}
        <h1 className="h-title font-serif font-bold text-white leading-[1.15] text-[2.1rem] sm:text-[3rem] max-w-[540px] mb-4 overflow-hidden">
          <span className="inline">Turning your imagination into a </span>
          <span
            className="inline italic"
            style={{
              backgroundImage:
                "linear-gradient(105deg,#FDE08D 0%,#E4B65E 40%,#B8862E 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            royal birthday
          </span>
          <span className="inline"> celebration</span>
        </h1>



        {/* ── PACKAGE CHIPS ── */}
        <div
          className="w-full max-w-xl relative"
          aria-label="Package price quick links"
        >
          {/* left/right edge fades on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[rgba(5,2,0,0.7)] to-transparent z-10 pointer-events-none sm:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[rgba(5,2,0,0.7)] to-transparent z-10 pointer-events-none sm:hidden" />

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 px-1 justify-start sm:justify-center">
            {PACKAGES.map((pkg) => (
              <a
                key={pkg.id}
                href={`#${pkg.id}`}
                className="h-chip group flex-none flex flex-col gap-1 min-w-[84px] px-3.5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.13)] bg-[rgba(255,255,255,0.06)] backdrop-blur hover:border-[rgba(228,182,94,0.55)] hover:bg-[rgba(228,182,94,0.12)] transition-all duration-300 active:scale-95 text-left"
              >
                <span className="text-[10.5px] font-semibold text-[rgba(255,255,255,0.5)] group-hover:text-[rgba(255,255,255,0.75)] transition-colors leading-none">
                  {pkg.shortName}
                </span>
                <b
                  className="text-[13px] font-extrabold leading-tight"
                  style={{
                    backgroundImage: "linear-gradient(90deg,#FDE08D,#E4B65E)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {pkg.pricePill}
                </b>
              </a>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="h-scroll mt-10 flex flex-col items-center gap-1.5 text-[rgba(255,255,255,0.35)]">
          <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown
            className="w-4 h-4 animate-bounce"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* ── BOTTOM PAGE BLEND ── */}
      <div className="absolute bottom-0 left-0 right-0 h-28 z-[3] bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />

      {/* ── TOP GOLD LINE ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(228,182,94,0.6) 30%, rgba(253,224,141,0.9) 50%, rgba(228,182,94,0.6) 70%, transparent 100%)",
        }}
      />
    </section>
  );
}
