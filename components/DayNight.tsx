"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/content/home";

// The signature moment (art-direction.md §7): the same suite verandas in the afternoon and after
// the pool lights come on. A click-driven crossfade, not scroll-jacking.
export function DayNight({ day, night, labels = { group: "Time of day", day: "Afternoon", night: "Evening" } }: { day: Photo; night: Photo; labels?: { group: string; day: string; night: string } }) {
  const [evening, setEvening] = useState(true);
  return (
    <div className="relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-photo)]">
        <Image src={day.src} alt={day.alt} fill sizes="(min-width:1024px) 640px, 100vw" className={`object-cover transition-opacity duration-700 ease-out-quint ${evening ? "opacity-0" : "opacity-100"}`} />
        <Image src={night.src} alt={night.alt} fill sizes="(min-width:1024px) 640px, 100vw" className={`object-cover transition-opacity duration-700 ease-out-quint ${evening ? "opacity-100" : "opacity-0"}`} />
      </div>
      <div role="group" aria-label={labels.group} className="absolute bottom-4 left-4 inline-flex rounded-[var(--radius-btn)] bg-obsidian/85 p-1 text-[14px] font-medium text-cream">
        {[
          [labels.day, false],
          [labels.night, true],
        ].map(([label, val]) => (
          <button
            key={label as string}
            type="button"
            aria-pressed={evening === val}
            onClick={() => setEvening(val as boolean)}
            className={`min-h-11 rounded-[var(--radius-field)] px-4 transition-colors duration-200 ${evening === val ? "bg-cream text-sea" : "text-cream/85 hover:text-cream"}`}
          >
            {label as string}
          </button>
        ))}
      </div>
    </div>
  );
}
