"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HERO, PACKAGES } from "@/content/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        gsap.from(".hero-anim", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="hero px-4 pt-8 pb-6 text-center relative overflow-hidden max-w-2xl mx-auto w-full">
      <div className="hero-logo hero-anim w-28 h-28 mx-auto mb-4 relative rounded-full overflow-hidden shadow-md border-2 border-line/60">
        <Image
          src="/images/hero.jpeg"
          alt="Ganpati Events"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <div className="hero-anim inline-block px-3 py-1 rounded-full bg-[rgba(184,134,46,0.1)] text-gold-deep text-[11.5px] sm:text-xs font-bold tracking-wide mb-2.5">
        {HERO.label}
      </div>

      <h1 className="hero-anim text-[28px] sm:text-[36px] leading-[1.2] font-bold max-w-[420px] mx-auto text-text font-serif">
        {HERO.h1}
      </h1>

      <div className="hero-anim hero-price-line my-2.5 text-gold-deep font-extrabold text-[16px] sm:text-[18px] tracking-tight">
        {HERO.priceRange}
      </div>

      <p className="hero-anim sub text-muted text-[14px] sm:text-[15.5px] max-w-[340px] mx-auto mt-1 leading-relaxed">
        {HERO.subtext}
      </p>

      <div className="hero-anim chips flex gap-2.5 overflow-x-auto pt-5 pb-2 px-1 no-scrollbar justify-start sm:justify-center scroll-smooth">
        {PACKAGES.map((pkg) => (
          <a
            key={pkg.id}
            href={`#${pkg.id}`}
            className="chip flex-none text-text bg-surface border border-line rounded-xl p-[10px_14px] text-[13px] font-semibold flex flex-col gap-0.5 min-w-[90px] shadow-sm hover:border-gold active:scale-95 transition-all text-left"
          >
            <span className="text-xs text-muted">{pkg.shortName}</span>
            <b className="text-gold-deep font-extrabold text-[13.5px]">
              {pkg.pricePill}
            </b>
          </a>
        ))}
      </div>
    </section>
  );
}
