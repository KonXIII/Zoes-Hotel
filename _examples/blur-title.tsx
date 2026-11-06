// Reference only — titles that blur into focus word by word (the house
// default for headings). Two halves, one look:
//   1. A headline on screen at load: <BlurWords> splits it on the server and
//      animates each word with the CSS `focus-in` class. No script, no flash.
//   2. Every title further down: mark it `data-title`; <Motion> (mounted once
//      in app/layout.tsx) splits it with GSAP SplitText and plays the blur
//      when it scrolls into view, once.
// Both collapse to an instant appear under prefers-reduced-motion, keep the
// heading readable as one phrase for screen readers, and leave text visible
// if JavaScript never runs. Files: starter/components/{Motion,BlurWords}.tsx
// and the `focus-in` keyframe in starter/app/globals.css.

import { BlurWords } from "@/components/BlurWords";

export function BlurTitleExample() {
  return (
    <main>
      <section className="min-h-[100svh] content-end px-6 pb-16">
        {/* 1. On screen at load: CSS, word by word. */}
        <h1 className="text-[clamp(48px,9vw,136px)] leading-[0.92] tracking-[-0.035em]">
          <BlurWords lines={["Every email read.", "Before you have."]} />
        </h1>
      </section>

      <section className="px-6 py-32">
        {/* 2. Below the fold: Motion blurs it in on scroll. */}
        <h2 data-title className="text-[clamp(36px,5.4vw,84px)] leading-[0.98] tracking-[-0.035em]">
          Hours back. Nothing slips.
        </h2>
        {/* Body copy rises in plainly; keep the blur for titles only. */}
        <p data-reveal className="mt-8 max-w-[52ch] text-[19px]">
          A shipping desk runs on email. The agent reads all of it.
        </p>
      </section>
    </main>
  );
}

// Rules
// - Titles only (h1/h2, a statement at most). Blurring body text or buttons reads as a glitch.
// - Don't also put data-reveal on a data-title element or its wrapper: it would animate twice.
// - Keep the blur ≤ 16px and clear the filter when settled (Motion does), so type isn't left on a GPU layer.
// - Splitting can change wrapping: re-check that every heading still sets in two lines at 390 / 768 / 1440.
