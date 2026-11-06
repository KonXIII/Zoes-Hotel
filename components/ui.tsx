// Small shared pieces for all pages: the arrow, the room-fact icons, the page wrap and the sketch layer.

export const wrap = "mx-auto w-full max-w-[1320px] px-5 md:px-10";

export const Arrow = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" className="arrow">
    <path d="M1 6h9M6.5 2.5 10 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const icons = {
  size: <path d="M3 9V3h6M21 15v6h-6M3 3l7 7M21 21l-7-7" />,
  bed: <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M6 9V6h5v3M13 9V6h5v3M3 18v2M21 18v2" />,
  guests: <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />,
  view: <path d="M2 18l6-7 4 4 3-3 7 6M2 21h20M17 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
};
export type IconName = keyof typeof icons;
export const Icon = ({ name }: { name: IconName }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-blue">
    {icons[name]}
  </svg>
);

// A faint pencil sketch of a Rhodes landmark behind a light section (public/sketches, multiply blend).
// A lazy <img> (not a CSS background, which can't be lazy-loaded), 2400x1200 source.
export const Sketch = ({ name, at = "bottom", faint = false }: { name: string; at?: "bottom" | "top"; faint?: boolean }) => (
  <div aria-hidden="true" data-sketch className={`sketch sketch--${at}${faint ? " sketch--faint" : ""}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`/sketches/${name}.webp`} srcSet={`/sketches/${name}-1200.webp 1200w, /sketches/${name}.webp 2400w`} sizes="100vw" alt="" width={2400} height={1200} loading="lazy" decoding="async" className="sketch__img" />
  </div>
);
