"use client";

import { HELP } from "@/content/site";
import { helpChoosingUrl } from "@/lib/whatsapp";

export default function HelpCta() {
  const whatsappUrl = helpChoosingUrl();

  return (
    <section className="py-[24px] px-[20px] max-w-2xl mx-auto">
      <div className="help-card text-center p-[26px_20px] bg-gradient-to-br from-white to-[var(--bg)] border border-line rounded-[16px] shadow-sm">
        <h2 className="text-[24px] font-serif font-bold text-text">{HELP.title}</h2>
        <p className="text-muted text-[13.5px] mt-[7px] mb-[18px] max-w-[440px] mx-auto leading-relaxed">
          {HELP.subtext}
        </p>
        <div className="flex justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-wine text-white font-bold text-[14px] px-[22px] py-[12px] rounded-[10px] shadow-sm hover:bg-opacity-95 transition-transform hover:scale-[1.02] active:scale-95"
          >
            {HELP.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
