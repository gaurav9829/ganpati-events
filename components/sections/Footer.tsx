"use client";

import { FOOTER, CONTACT } from "@/content/site";

export default function Footer() {
  return (
    <footer className="pt-[24px] pb-[70px] sm:pb-[30px] px-[20px] max-w-2xl mx-auto text-center border-t border-line/60 mt-6">
      <h2 className="text-[24px] font-serif font-bold text-text mb-2">
        {FOOTER.title}
      </h2>
      <p className="text-muted text-[14px] m-0">{FOOTER.addressPhone}</p>
      <p className="text-[13.5px] mt-1 mb-4">
        Instagram:{" "}
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-deep font-bold hover:underline"
        >
          {CONTACT.instagramHandle}
        </a>
      </p>

      <div className="contact-links flex flex-wrap justify-center gap-[8px] my-5">
        <a
          href={CONTACT.tel}
          className="secondary-btn inline-flex items-center justify-center gap-1 text-text bg-surface border border-line font-extrabold text-[13px] px-[16px] py-[11px] rounded-[10px] hover:bg-gold/10 transition-colors"
        >
          📞 Call Now
        </a>
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="secondary-btn inline-flex items-center justify-center gap-1 text-text bg-surface border border-line font-extrabold text-[13px] px-[16px] py-[11px] rounded-[10px] hover:bg-gold/10 transition-colors"
        >
          📸 Instagram
        </a>
        <a
          href={CONTACT.whatsappBase}
          target="_blank"
          rel="noopener noreferrer"
          className="secondary-btn inline-flex items-center justify-center gap-1 text-text bg-surface border border-line font-extrabold text-[13px] px-[16px] py-[11px] rounded-[10px] hover:bg-gold/10 transition-colors"
        >
          💬 WhatsApp Us
        </a>
      </div>

      <div className="signoff-line font-serif italic text-gold-deep text-[15px] font-semibold mt-4">
        {FOOTER.signoff}
      </div>
    </footer>
  );
}
