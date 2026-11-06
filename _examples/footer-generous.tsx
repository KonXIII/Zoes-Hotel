// Reference only — generous, information-rich footer. Clear IA, no social dumping.

export function FooterGenerous() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--color-border)] px-6 md:px-12 py-[var(--space-16)]">
      <div className="mx-auto max-w-[88rem] grid grid-cols-12 gap-x-6 gap-y-[var(--space-12)]">
        <div className="col-span-12 md:col-span-5">
          <p className="font-[family-name:var(--font-display)] text-[length:var(--text-h3)] leading-tight tracking-[-0.01em] max-w-[22ch]">
            Independent studio making careful sites for careful clients.
          </p>
          <address className="mt-[var(--space-6)] not-italic text-sm text-[color:var(--color-fg-muted)] leading-relaxed">
            42 Permanent Street<br />
            Patras, Greece<br />
            <a href="mailto:hello@studio.com" className="underline decoration-1 underline-offset-4 hover:text-[color:var(--color-fg)]">
              hello@studio.com
            </a>
          </address>
        </div>

        <nav aria-label="Footer" className="col-span-6 md:col-span-2">
          <p className="text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)] mb-[var(--space-3)]">
            Studio
          </p>
          <ul className="space-y-[var(--space-2)] text-sm">
            <li><a href="/work" className="hover:text-[color:var(--color-brand)]">Work</a></li>
            <li><a href="/studio" className="hover:text-[color:var(--color-brand)]">About</a></li>
            <li><a href="/journal" className="hover:text-[color:var(--color-brand)]">Journal</a></li>
            <li><a href="/contact" className="hover:text-[color:var(--color-brand)]">Contact</a></li>
          </ul>
        </nav>

        <div className="col-span-6 md:col-span-2">
          <p className="text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)] mb-[var(--space-3)]">
            Services
          </p>
          <ul className="space-y-[var(--space-2)] text-sm">
            <li><a href="/services/brand">Brand systems</a></li>
            <li><a href="/services/web">Web design</a></li>
            <li><a href="/services/motion">Motion</a></li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-3">
          <p className="text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)] mb-[var(--space-3)]">
            Newsletter
          </p>
          <p className="text-sm text-[color:var(--color-fg-muted)] mb-[var(--space-4)]">
            One email a month. Recent work and what we&rsquo;re reading.
          </p>
          <form className="flex gap-2">
            <label htmlFor="nl-email" className="sr-only">Email</label>
            <input
              id="nl-email"
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 min-h-11 bg-transparent border-b border-[color:var(--color-border)] focus:border-[color:var(--color-brand)] focus:outline-none text-sm px-1"
            />
            <button
              type="submit"
              className="min-h-11 px-4 rounded-full bg-[color:var(--color-fg)] text-[color:var(--color-bg)] text-sm"
            >
              Join
            </button>
          </form>
        </div>

        <div className="col-span-12 flex flex-wrap justify-between items-baseline gap-4 pt-[var(--space-8)] mt-[var(--space-8)] border-t border-[color:var(--color-border)] text-[length:var(--text-caption)] uppercase tracking-[0.14em] text-[color:var(--color-fg-muted)]">
          <span>&copy; {year} Studio</span>
          <span className="tabular-nums">Est. 2021</span>
        </div>
      </div>
    </footer>
  );
}
