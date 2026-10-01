"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
}

export default function Lightbox({ isOpen, imageSrc, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isOpen && overlayRef.current && contentRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: "power2.out" }
        );
        gsap.fromTo(
          contentRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" }
        );
      }
    },
    { dependencies: [isOpen] }
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged photo modal"
    >
      <div
        ref={contentRef}
        className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-2 text-white bg-white/20 hover:bg-white/30 rounded-full p-2.5 text-2xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Close enlarged photo"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="relative w-full h-[75vh] max-w-3xl">
          <Image
            src={imageSrc}
            alt="Enlarged photo"
            fill
            className="object-contain rounded-xl"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
