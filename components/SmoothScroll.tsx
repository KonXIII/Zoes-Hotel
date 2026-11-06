"use client";
import "lenis/dist/lenis.css"; // required: Lenis's own CSS (stopped state, nested scroll, iframes)
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

// The kit's one smooth-scroll setup (SKILL-BIBLE → Lenis). Mounted once in app/layout.tsx.
export function SmoothScroll() {
  const lenis = useLenis(ScrollTrigger.update); // keep ScrollTrigger in sync on every Lenis scroll

  useEffect(() => {
    if (!lenis) return;
    const tick = (time: number) => lenis.raf(time * 1000); // GSAP's ticker drives Lenis: one frame loop
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, [lenis]);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.12,
        anchors: true, // smooth #section links; offset from html { scroll-padding-top }
        stopInertiaOnNavigate: true,
        // respectReducedMotion defaults to true (lenis ≥1.3.26)
      }}
    />
  );
}
