"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/content/site";

export default function Header() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // When near the top, never show the header WhatsApp button
      if (currentScrollY <= 150) {
        setShowWhatsApp(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // User is scrolling UP past 150px
        setShowWhatsApp(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        // User is scrolling DOWN
        setShowWhatsApp(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="topbar sticky top-0 z-30 bg-[rgba(251,246,236,0.95)] backdrop-blur-[8px] border-b border-line flex items-center justify-between px-4 py-2.5 max-w-2xl mx-auto w-full transition-all">
      <div className="topbar-brand flex items-center gap-2.5">
        <Image
          src="/images/logo.jpeg"
          alt="Ganpati Events logo"
          width={36}
          height={36}
          className="w-9 h-9 object-cover rounded-full shadow-sm border border-line"
          priority
          unoptimized
        />
        <span className="font-serif text-lg sm:text-xl font-bold tracking-wide text-text">
          Ganpati Events
        </span>
      </div>

      <a
        href={CONTACT.whatsappBase}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 transform active:scale-95 ${
          showWhatsApp
            ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-x-4 scale-90 pointer-events-none"
        }`}
        aria-label="WhatsApp Us"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>WhatsApp</span>
      </a>
    </header>
  );
}
