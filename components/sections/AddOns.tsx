"use client";

import { ADDONS } from "@/content/site";

export default function AddOns() {
  return (
    <section className="py-[30px] px-[20px] max-w-2xl mx-auto">
      <div className="section-head mb-[18px]">
        <h2 className="text-[26px] font-serif font-bold text-text">{ADDONS.title}</h2>
        <p className="text-muted text-[14.5px] mt-[6px]">{ADDONS.subtext}</p>
      </div>

      <div className="bg-surface border border-line rounded-[16px] p-[20px] shadow-sm">
        <h3 className="text-[17.5px] font-serif font-bold text-gold-deep mb-4 pb-2 border-b border-line">
          {ADDONS.photographyTitle}
        </h3>

        <div className="flex flex-col gap-5">
          {ADDONS.options.map((opt, idx) => (
            <div key={idx} className="border-b border-line/60 pb-4 last:border-b-0 last:pb-0">
              <div className="addon-row flex justify-between items-baseline mb-1">
                <h4 className="text-[16px] font-serif font-bold text-text m-0">
                  {opt.name}
                </h4>
                <span className="text-gold-deep font-extrabold text-[14px]">
                  {opt.price}
                </span>
              </div>
              <p className="text-[13.5px] text-muted mb-3 leading-snug">{opt.desc}</p>

              <div className="sample-links flex flex-wrap gap-2">
                {opt.links.map((lnk, lIdx) => (
                  <a
                    key={lIdx}
                    href={lnk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-bold text-emerald-deep bg-[rgba(31,111,92,0.08)] border border-[rgba(31,111,92,0.25)] px-[11px] py-[6px] rounded-full hover:bg-[rgba(31,111,92,0.18)] transition-colors"
                  >
                    {lnk.label} ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-line">
          <div className="addon-row flex justify-between items-baseline mb-1">
            <h3 className="text-[16.5px] font-serif font-bold text-text m-0">
              {ADDONS.sound.title}
            </h3>
            <span className="text-gold-deep font-extrabold text-[14px]">
              {ADDONS.sound.price}
            </span>
          </div>
          <p className="text-[13.5px] text-muted m-0">{ADDONS.sound.desc}</p>
        </div>
      </div>
    </section>
  );
}
