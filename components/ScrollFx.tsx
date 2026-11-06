"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Scroll motion for the homepage, from the owner's reference recording (Aurelia), done in our own way:
 * - [data-frame-parallax] img: the photograph drifts inside its frame (the frame never moves).
 * - [data-assemble] > *: gallery photos arrive scattered and tilted, then settle into the grid as you scroll.
 * - [data-sketch]: the Rhodes sketch layer drifts slower than the page.
 * Mounted at the end of the page (after hydration). Nothing moves under prefers-reduced-motion.
 */
export function ScrollFx() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      for (const frame of gsap.utils.toArray<HTMLElement>("[data-frame-parallax]")) {
        const img = frame.querySelector("img");
        if (!img) continue;
        gsap.set(img, { scale: 1.14 });
        gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } });
      }

      for (const grid of gsap.utils.toArray<HTMLElement>("[data-assemble]")) {
        const tiles = Array.from(grid.children) as HTMLElement[];
        const k = Math.min(1, window.innerWidth / 1200); // phones scatter less, and never past the screen edge
        // A fixed scatter (not random) so it looks composed and is the same on every visit
        const scatter = [
          { x: -60, y: 120, rotate: -6, scale: 0.86 },
          { x: 90, y: 160, rotate: 7, scale: 0.8 },
          { x: 140, y: 60, rotate: -4, scale: 0.82 },
          { x: 40, y: 220, rotate: 5, scale: 0.8 },
          { x: 160, y: 200, rotate: -8, scale: 0.78 },
        ];
        tiles.forEach((tile, i) => {
          gsap.fromTo(
            tile,
            { x: scatter[i % scatter.length].x * k, y: scatter[i % scatter.length].y * k, rotate: scatter[i % scatter.length].rotate, scale: scatter[i % scatter.length].scale, opacity: 0.4 },
            { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: grid, start: "top 95%", end: "top 35%", scrub: 0.6 } },
          );
        });
      }

      for (const sketch of gsap.utils.toArray<HTMLElement>("[data-sketch]")) {
        gsap.fromTo(sketch, { yPercent: 6 }, { yPercent: -6, ease: "none", scrollTrigger: { trigger: sketch.parentElement ?? sketch, start: "top bottom", end: "bottom top", scrub: true } });
      }
    });
    return () => mm.revert();
  }, []);

  return null;
}
