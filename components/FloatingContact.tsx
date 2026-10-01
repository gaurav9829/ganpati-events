"use client";

import { CONTACT } from "@/content/site";
import { MessageCircle, Phone } from "lucide-react";

export default function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-2 pb-[env(safe-area-inset-bottom)] sm:hidden">
      <a
        href={CONTACT.whatsappBase}
        target="_blank"
        rel="noopener noreferrer"
        className="float-wa flex items-center gap-2 bg-[#25D366] text-white p-[12px_16px] rounded-full text-[13.5px] font-extrabold shadow-lg hover:brightness-105 active:scale-95 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span>WhatsApp</span>
      </a>
      <a
        href={CONTACT.tel}
        className="flex items-center gap-2 bg-wine text-white p-[10px_16px] rounded-full text-[13px] font-extrabold shadow-md hover:brightness-110 active:scale-95 transition-all justify-center"
        aria-label="Call Now"
      >
        <Phone className="w-4 h-4 fill-current" />
        <span>Call Now</span>
      </a>
    </div>
  );
}
