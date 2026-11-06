// Reference only — single bold CTA block. One clear action.
// Restrained motion: hover scale on button only, no distractions.

export function CtaBold() {
  return (
    <section
      className="px-6 md:px-12 py-[var(--space-32)] bg-[color:var(--color-fg)] text-[color:var(--color-bg)]"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-[88rem] grid grid-cols-12 gap-x-6 gap-y-[var(--space-8)] items-end">
        <h2
          id="cta-heading"
          className="col-span-12 md:col-span-8 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[0.95] tracking-[-0.02em]"
        >
          Got a project that deserves better than a template?
        </h2>

        <div className="col-span-12 md:col-span-4 md:text-right">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-[color:var(--color-bg)] text-[color:var(--color-fg)] px-7 py-4 font-medium transition-transform duration-[var(--duration-micro)] ease-[var(--ease-out-quart)] hover:scale-[0.97]"
          >
            Start a conversation
            <span aria-hidden className="text-lg">
              →
            </span>
          </a>
          <p className="mt-[var(--space-4)] text-sm text-[color:color-mix(in_oklch,var(--color-bg)_70%,transparent)]">
            We reply within one working day.
          </p>
        </div>
      </div>
    </section>
  );
}
