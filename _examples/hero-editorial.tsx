// Reference only — do not import. Copy-adapt to your project.
//
// Editorial hero. Oversized serif display type. Off-grid right column with a
// rotating marquee of credits. No gradient, no glass, no cyan.
// Token-driven — colors and fonts come from globals.css @theme.

export function HeroEditorial() {
  return (
    <section
      className="relative min-h-[92svh] px-6 md:px-12 py-[var(--space-16)] md:py-[var(--space-24)] overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-[var(--space-8)]">
        <p className="col-span-12 md:col-span-3 text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)]">
          A studio, not an agency
        </p>

        <h1
          id="hero-title"
          className="col-span-12 md:col-span-9 font-[family-name:var(--font-display)] text-[length:var(--text-display)] leading-[0.92] tracking-[-0.03em] text-balance"
        >
          We build the web{" "}
          <em className="italic text-[color:var(--color-brand)]">
            you&rsquo;d actually
          </em>{" "}
          show your friends.
        </h1>

        <div className="col-start-1 md:col-start-4 col-span-12 md:col-span-6 mt-[var(--space-6)] max-w-[48ch]">
          <p className="text-[length:var(--text-lead)] leading-relaxed text-[color:var(--color-fg-muted)]">
            Independent studio making sites for founders who care about the
            craft. Motion, type, systems — done on our own stack, shipped fast.
          </p>

          <div className="mt-[var(--space-8)] flex flex-wrap gap-[var(--space-3)]">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-fg)] text-[color:var(--color-bg)] px-5 py-2.5 text-sm font-medium transition-transform duration-[var(--duration-micro)] ease-[var(--ease-out-quart)] hover:scale-[0.98]"
            >
              See recent work
              <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-[color:var(--color-fg)] underline decoration-1 underline-offset-4 transition-colors hover:text-[color:var(--color-brand)]"
            >
              Start a project
            </a>
          </div>
        </div>

        <aside className="col-span-12 md:col-span-3 md:col-start-10 mt-[var(--space-12)] md:mt-0 md:self-end border-l border-[color:var(--color-border)] pl-[var(--space-4)]">
          <p className="text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)] mb-[var(--space-3)]">
            Recent
          </p>
          <ul className="space-y-[var(--space-2)] text-sm">
            <li className="flex justify-between gap-2">
              <span>Atelier Nord</span>
              <span className="text-[color:var(--color-fg-muted)] tabular-nums">
                &rsquo;26
              </span>
            </li>
            <li className="flex justify-between gap-2">
              <span>Meridian Coffee</span>
              <span className="text-[color:var(--color-fg-muted)] tabular-nums">
                &rsquo;26
              </span>
            </li>
            <li className="flex justify-between gap-2">
              <span>Kairos Capital</span>
              <span className="text-[color:var(--color-fg-muted)] tabular-nums">
                &rsquo;25
              </span>
            </li>
          </ul>
        </aside>
      </div>

      <span
        aria-hidden
        className="absolute left-6 md:left-12 bottom-6 text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)]"
      >
        Scroll
      </span>
    </section>
  );
}
