"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STEPS } from "@/content/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function BookingSteps() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        gsap.from(".step-card-anim", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          x: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-[30px] px-[20px] max-w-2xl mx-auto">
      <div className="section-head mb-[18px]">
        <h2 className="text-[26px] font-serif font-bold text-text">{STEPS.title}</h2>
        <p className="text-muted text-[14.5px] mt-[6px]">{STEPS.subtext}</p>
      </div>

      <div className="booking-steps grid gap-[10px]">
        {STEPS.items.map((step, idx) => (
          <div
            key={idx}
            className="step-card-anim booking-step flex gap-[14px] items-start p-[15px] bg-surface border border-line rounded-[14px] shadow-sm hover:border-gold transition-colors"
          >
            <div className="booking-num shrink-0 w-[42px] h-[42px] rounded-[12px] flex items-center justify-center bg-[rgba(184,134,46,0.12)] text-gold-deep font-extrabold text-[13px]">
              {step.num}
            </div>
            <div>
              <h3 className="text-[16px] font-serif font-bold text-text mb-[3px]">
                {step.title}
              </h3>
              <p className="m-0 text-muted text-[13px] leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
