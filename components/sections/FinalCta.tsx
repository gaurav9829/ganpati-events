"use client";

import { FINAL_CTA, CONTACT } from "@/content/site";

export default function FinalCta() {
  return (
    <section className="py-[30px] px-[20px] max-w-2xl mx-auto">
      <div className="final-cta text-center p-[28px_18px] rounded-[18px] bg-wine text-white shadow-md">
        <h2 className="text-[25px] font-serif font-bold m-0">{FINAL_CTA.title}</h2>
        <p className="my-[8px] mx-auto text-[13.5px] opacity-90 max-w-[450px] leading-relaxed">
          {FINAL_CTA.subtext}
        </p>

        <div className="contact-links flex flex-wrap justify-center gap-[8px] mt-5">
          <a
            href={CONTACT.whatsappBase}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-btn inline-flex items-center justify-center gap-1 text-text bg-surface border border-line font-extrabold text-[13px] px-[16px] py-[11px] rounded-[10px] hover:bg-gold-light/20 transition-colors shadow-sm"
          >
            📅 Check Availability
          </a>
          <a
            href={CONTACT.whatsappBase}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-btn inline-flex items-center justify-center gap-1 text-text bg-surface border border-line font-extrabold text-[13px] px-[16px] py-[11px] rounded-[10px] hover:bg-gold-light/20 transition-colors shadow-sm"
          >
            💬 WhatsApp Us
          </a>
          <a
            href={CONTACT.tel}
            className="secondary-btn inline-flex items-center justify-center gap-1 text-text bg-surface border border-line font-extrabold text-[13px] px-[16px] py-[11px] rounded-[10px] hover:bg-gold-light/20 transition-colors shadow-sm"
          >
            📞 Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
