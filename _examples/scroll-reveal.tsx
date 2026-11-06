// Reference only — GSAP ScrollTrigger reveal, wrapped in matchMedia for
// a11y (prefers-reduced-motion) + responsive. useGSAP handles cleanup.
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
            },
          );
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".reveal", { opacity: 1, y: 0 });
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}

// Usage:
// <ScrollReveal>
//   <h2 className="reveal">A headline</h2>
//   <p className="reveal">A paragraph.</p>
// </ScrollReveal>
