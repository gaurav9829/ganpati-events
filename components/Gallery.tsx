"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

interface GalleryProps {
  images: { src: string; alt: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <span className="text-[12px] font-bold text-gold-deep">
            📸 Photos ({images.length})
          </span>
          <span className="text-[11px] text-muted">
            👉 Swipe to view more
          </span>
        </div>

        <div className="pkg-photos flex gap-2.5 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(img.src)}
              className="flex-shrink-0 relative h-[130px] w-[175px] rounded-xl overflow-hidden border border-line bg-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-200 active:scale-95 group"
              aria-label={`Open photo ${idx + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="175px"
                className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={!!selectedImage}
        imageSrc={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
