// Reference only — asymmetric feature grid. Varied cell sizes, real rhythm,
// no identical cards. Uses CSS grid areas at md+.

const items = [
  {
    title: "Type as interface",
    body: "We design around the words first. Type scale, line length, contrast, rhythm — every component is a typographic choice.",
    tag: "01",
    area: "a",
  },
  {
    title: "Motion with intent",
    body: "Every animation answers: does this help the user understand, or is it decoration? If it's decoration, we remove it.",
    tag: "02",
    area: "b",
  },
  {
    title: "Measured systems",
    body: "Tokens, not magic numbers. Every color, size, and duration lives in one place and can be changed in one place.",
    tag: "03",
    area: "c",
  },
  {
    title: "Performance as craft",
    body: "A beautiful site that takes 6 seconds to load isn't beautiful. We ship work that feels instant.",
    tag: "04",
    area: "d",
  },
];

export function FeatureGridAsymmetric() {
  return (
    <section className="px-6 md:px-12 py-[var(--space-24)]" aria-labelledby="principles">
      <header className="max-w-[60ch] mb-[var(--space-12)]">
        <p className="text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)]">
          How we work
        </p>
        <h2
          id="principles"
          className="mt-[var(--space-3)] font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-[0.95] tracking-[-0.02em]"
        >
          Four principles. Every project.
        </h2>
      </header>

      <div
        className="grid gap-[var(--space-4)] md:grid-cols-6 md:auto-rows-[minmax(220px,auto)]"
        style={{
          gridTemplateAreas: `
            "a a a b b b"
            "c c d d d d"
          `,
        }}
      >
        {items.map((item) => (
          <article
            key={item.tag}
            style={{ gridArea: item.area }}
            className="group relative flex flex-col justify-between rounded-[var(--radius-lg)] bg-[color:var(--color-surface)] p-[var(--space-6)] md:p-[var(--space-8)] border border-[color:var(--color-border)]"
          >
            <span className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] text-[color:var(--color-fg-muted)] tabular-nums">
              {item.tag}
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight tracking-[-0.01em]">
                {item.title}
              </h3>
              <p className="mt-[var(--space-3)] max-w-[48ch] text-[color:var(--color-fg-muted)]">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
