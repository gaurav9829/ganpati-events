"use client";

import { PACKAGES } from "@/content/site";
import PackageCard from "../PackageCard";

export default function Packages() {
  return (
    <section className="py-[30px] px-[20px] max-w-2xl mx-auto">
      <div className="section-head mb-[18px]">
        <h2 className="text-[26px] font-serif font-bold text-text">Choose your package</h2>
        <p className="text-muted text-[14.5px] mt-[6px]">
          Tap a package to see the full list, photos, and enquire.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        {PACKAGES.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}
