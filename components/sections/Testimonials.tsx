"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TESTIMONIALS } from "@/content/site";
import { Star } from "lucide-react";
import ReviewForm from "../ReviewForm";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Testimonials() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Array<{ quote: string; author: string; rating?: number }>>([
    ...TESTIMONIALS.items,
  ]);

  useGSAP(
    () => {
      if (trackRef.current) {
        // Continuous smooth right-to-left marquee animation
        const tween = gsap.to(trackRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 22,
          ease: "none",
        });

        // Pause on hover or touch
        const container = marqueeRef.current;
        if (container) {
          const pause = () => tween.pause();
          const resume = () => tween.play();
          
          container.addEventListener("mouseenter", pause);
          container.addEventListener("mouseleave", resume);
          container.addEventListener("touchstart", pause, { passive: true });
          container.addEventListener("touchend", resume, { passive: true });
        }
      }
    },
    { scope: marqueeRef, dependencies: [reviews] }
  );

  const handleReviewAdded = (newReview: { quote: string; author: string; rating: number }) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // Duplicate items for infinite seamless scroll
  const displayItems = [...reviews, ...reviews];

  return (
    <section className="py-[30px] px-4 max-w-2xl mx-auto overflow-hidden">
      <div className="section-head mb-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(184,134,46,0.1)] text-gold-deep text-xs font-bold mb-2">
          <Star className="w-3.5 h-3.5 fill-current text-gold" />
          <span>5.0 Star Client Rating</span>
        </div>
        <h2 className="text-2xl sm:text-[26px] font-serif font-bold text-text">
          {TESTIMONIALS.title}
        </h2>
        <p className="text-muted text-xs sm:text-sm mt-1">
          👉 Swipe left/right to view all reviews from our happy families
        </p>
      </div>

      <div
        ref={marqueeRef}
        className="marquee-wrap overflow-x-auto sm:overflow-hidden py-2 cursor-grab active:cursor-grabbing no-scrollbar"
      >
        <div
          ref={trackRef}
          className="marquee-track flex gap-3.5 w-max whitespace-normal"
        >
          {displayItems.map((item, idx) => (
            <div
              key={idx}
              className="quote-card flex-none w-[270px] sm:w-[310px] bg-surface border border-line rounded-2xl p-5 shadow-sm hover:border-gold transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-500 mb-2.5 gap-0.5">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-[14.5px] leading-relaxed text-text mb-3 m-0">
                  {item.quote}
                </p>
              </div>
              <div className="pt-2 border-t border-line/50 flex items-center justify-between">
                <span className="text-gold-deep font-bold text-xs tracking-wide">
                  — {item.author}
                </span>
                <span className="text-[10.5px] font-semibold text-emerald-deep bg-emerald/10 px-2 py-0.5 rounded-full">
                  Verified Client
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReviewForm onReviewAdded={handleReviewAdded} />
    </section>
  );
}
