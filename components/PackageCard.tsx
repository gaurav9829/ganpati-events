"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PackageItem, CONTACT } from "@/content/site";
import { packageEnquiryUrl } from "@/lib/whatsapp";
import Gallery from "./Gallery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface PackageCardProps {
  pkg: PackageItem;
  defaultOpen?: boolean;
}

export default function PackageCard({ pkg, defaultOpen = false }: PackageCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (contentRef.current) {
        if (isOpen) {
          gsap.to(contentRef.current, {
            height: "auto",
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          });
        } else {
          gsap.to(contentRef.current, {
            height: 0,
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
          });
        }
      }
    },
    { dependencies: [isOpen] }
  );

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const whatsappUrl = packageEnquiryUrl(pkg.shortName, pkg.priceWhatsApp);

  return (
    <div
      id={pkg.id}
      ref={cardRef}
      className="pkg bg-surface border border-line rounded-[16px] mb-[14px] overflow-hidden scroll-mt-20 transition-shadow hover:shadow-md"
    >
      <div
        onClick={toggleOpen}
        className="pkg-head cursor-pointer p-[18px] min-h-[76px] flex items-center justify-between gap-3 select-none"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleOpen();
          }
        }}
      >
        <div className="pkg-head-main flex flex-col gap-1">
          <div className="flex items-center flex-wrap gap-2">
            <span className="pkg-name font-serif text-[21px] font-bold text-text">
              {pkg.name}
            </span>
            {pkg.badges.map((badge, idx) => (
              <span
                key={idx}
                className="badge inline-block bg-emerald text-white text-[10.5px] font-extrabold px-[9px] py-[3px] rounded-full tracking-wide"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="pkg-tag text-[12.5px] text-muted m-0">{pkg.tagline}</p>
          <div className="best-for text-[13px] text-muted mt-1 p-[10px_12px] rounded-[10px] bg-[rgba(184,134,46,0.08)] border border-[rgba(184,134,46,0.18)]">
            Best for: <strong className="text-gold-deep font-bold">{pkg.bestFor}</strong>
          </div>
        </div>
        <div className="pkg-head-side flex items-center gap-[10px] shrink-0 self-start mt-1">
          <span className="pkg-price font-extrabold text-gold-deep text-[15px] whitespace-nowrap">
            {pkg.priceCard}
          </span>
          <div
            className={`chevron w-[9px] h-[9px] border-r-2 border-b-2 border-muted transition-transform duration-250 ${
              isOpen ? "rotate-45" : "-rotate-45 -mt-[2px]"
            }`}
          />
        </div>
      </div>

      <div
        ref={contentRef}
        className="pkg-body px-[18px] overflow-hidden"
        style={{ height: defaultOpen ? "auto" : 0, opacity: defaultOpen ? 1 : 0 }}
      >
        <div className="pt-2 pb-5">
          <ul className="pkg-list my-1 p-0 list-none grid grid-cols-1 gap-[9px]">
            {pkg.features.map((feature, idx) => (
              <li
                key={idx}
                className="text-[13.5px] pl-[24px] relative text-text before:content-[attr(data-num)] before:absolute before:left-0 before:text-gold before:font-bold"
                data-num={`${idx + 1}.`}
              >
                {feature}
              </li>
            ))}
          </ul>

          {pkg.images && pkg.images.length > 0 && <Gallery images={pkg.images} />}

          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="insta-more inline-flex items-center justify-center w-full my-[2px] mb-[14px] p-[10px_14px] rounded-[10px] text-[13px] font-extrabold text-emerald-deep bg-[rgba(31,111,92,0.08)] border border-[rgba(31,111,92,0.2)] hover:bg-[rgba(31,111,92,0.15)] transition-colors"
          >
            📸 View More Work on Instagram {CONTACT.instagramHandle}
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-btn inline-block bg-wine text-white font-bold text-[14px] p-[12px_18px] rounded-[10px] w-full text-center hover:bg-opacity-95 transition-all shadow-sm"
          >
            📅 Check Availability on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
