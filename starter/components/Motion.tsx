"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/*
 * Site-wide motion, driven by attributes so server components stay static.
 * Mount once in app/layout.tsx, after <main>: <Motion />.
 *
 * - [data-title]    headings blur into focus word by word as they come into view.
 * - [data-reveal]   rises in once as it enters the viewport, staggered with its neighbours.
 * - [data-parallax] drifts slowly against the scroll of its parent.
 * - [data-scrub-words] a long sentence whose words sharpen one by one with the scroll.
 * - [data-blur-out]    content that blurs and lifts away as it scrolls off the top.
 *
 * Only elements still below the fold are hidden first, so nothing on the first
 * screen flashes; for a headline that is on screen at load use <BlurWords />,
 * which does the same blur in pure CSS. Without JavaScript everything is
 * visible, and nothing moves under prefers-reduced-motion.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const belowFold = (el: HTMLElement) => el.getBoundingClientRect().top > window.innerHeight * 0.9;

      // One-time entrances watch with IntersectionObserver rather than ScrollTrigger: it also fires when the page
      // jumps straight to a section (an anchor link, a restored scroll position), where a once-trigger can miss.
      const observers: IntersectionObserver[] = [];
      const whenSeen = (targets: HTMLElement[], play: (batch: HTMLElement[]) => void) => {
        const observer = new IntersectionObserver(
          (entries) => {
            const batch = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target as HTMLElement);
            batch.forEach((el) => observer.unobserve(el));
            if (batch.length) play(batch);
          },
          { rootMargin: "0px 0px -10% 0px" },
        );
        targets.forEach((el) => observer.observe(el));
        observers.push(observer);
      };

      const splits: SplitText[] = [];
      const titles = gsap.utils.toArray<HTMLElement>("[data-title]").filter(belowFold);
      const wordsOf = new Map<HTMLElement, Element[]>();
      for (const title of titles) {
        // aria: "auto" keeps the heading read as one phrase, not word by word.
        const split = SplitText.create(title, { type: "words", tag: "span", aria: "auto" });
        splits.push(split);
        wordsOf.set(title, split.words);
        gsap.set(split.words, { autoAlpha: 0, filter: "blur(14px)", yPercent: 18 });
      }
      whenSeen(titles, (batch) =>
        batch.forEach((title) =>
          gsap.to(wordsOf.get(title) ?? [], {
            autoAlpha: 1,
            filter: "blur(0px)",
            yPercent: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
            // Drop the filter once settled so the type is not left on its own layer.
            clearProps: "filter,transform",
          }),
        ),
      );

      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(belowFold);
      gsap.set(reveals, { autoAlpha: 0, y: 28 });
      whenSeen(reveals, (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08, overwrite: true }));

      // A statement read with the scroll: each word sharpens from a dim blur as the paragraph passes the middle of the screen.
      for (const statement of gsap.utils.toArray<HTMLElement>("[data-scrub-words]")) {
        const split = SplitText.create(statement, { type: "words", tag: "span", aria: "auto" });
        splits.push(split);
        gsap.fromTo(
          split.words,
          { opacity: 0.14, filter: "blur(8px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: statement, start: "top 85%", end: "bottom 40%", scrub: 0.6 },
          }
        );
      }

      // Content that blurs and lifts away as it scrolls off the top (the hero's first screen).
      for (const el of gsap.utils.toArray<HTMLElement>("[data-blur-out]")) {
        gsap.to(el, {
          opacity: 0,
          filter: "blur(12px)",
          y: -60,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom 15%", scrub: true },
        });
      }

      for (const el of gsap.utils.toArray<HTMLElement>("[data-parallax]")) {
        gsap.fromTo(
          el,
          { yPercent: 0 },
          { yPercent: 14, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top top", end: "bottom top", scrub: true } }
        );
      }

      return () => {
        observers.forEach((observer) => observer.disconnect());
        splits.forEach((split) => split.revert());
      };
    });
    return () => mm.revert();
  }, [pathname]);

  return null;
}
