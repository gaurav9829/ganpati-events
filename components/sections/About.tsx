"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ABOUT } from "@/content/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (sectionRef.current) {
        gsap.from(".about-card-anim", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-[30px] px-[20px] max-w-2xl mx-auto">
      <div className="section-head mb-[18px]">
        <h2 className="text-[26px] font-serif font-bold text-text">{ABOUT.title}</h2>
        <p className="text-muted text-[14.5px] mt-[6px]">{ABOUT.intro}</p>
      </div>

      <div className="about-grid grid grid-cols-1 sm:grid-cols-2 gap-[10px] mt-[18px]">
        {ABOUT.items.map((item, idx) => (
          <div
            key={idx}
            className="about-card-anim about-card bg-surface border border-line rounded-[14px] p-[16px_18px]"
          >
            <h3 className="text-[17px] font-serif font-semibold text-gold-deep mb-[4px]">
              {item.title}
            </h3>
            <p className="text-[14px] text-muted m-0">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
