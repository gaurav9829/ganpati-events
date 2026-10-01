"use client";

import { useState } from "react";
import { FAQ } from "@/content/site";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-[30px] px-[20px] max-w-2xl mx-auto">
      <div className="section-head mb-[18px]">
        <h2 className="text-[26px] font-serif font-bold text-text">{FAQ.title}</h2>
        <p className="text-muted text-[14.5px] mt-[6px]">{FAQ.subtext}</p>
      </div>

      <div className="flex flex-col gap-[10px]">
        {FAQ.items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-surface border border-line rounded-[14px] overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full text-left p-[16px_18px] flex justify-between items-center gap-3 font-serif font-semibold text-[16px] text-text hover:text-gold-deep transition-colors"
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <span className={`text-gold-deep font-bold transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {isOpen && (
                <div className="px-[18px] pb-[16px] pt-1 text-[13.5px] text-muted border-t border-line/40 leading-relaxed animate-fadeIn">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
