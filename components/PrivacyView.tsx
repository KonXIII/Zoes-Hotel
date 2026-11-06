import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { wrap } from "@/components/ui";
import type { Locale } from "@/content/i18n";
import { privacy } from "@/content/privacy";

export function PrivacyView({ locale }: { locale: Locale }) {
  const p = privacy(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main" className="pb-24 pt-[120px] md:pb-32 md:pt-[150px]">
        <div className={`${wrap} max-w-[860px]`}>
          <h1 className="display text-[44px] md:text-[64px]">{p.h1}</h1>
          <p className="mt-3 text-[15px] text-muted">{p.updated}</p>
          <div className="mt-12 space-y-10">
            {p.sections.map(([h, t]) => (
              <section key={h}>
                <h2 className="display text-[26px] md:text-[30px]">{h}</h2>
                <p className="mt-3 max-w-[68ch] text-[17px] leading-relaxed text-ink/85">{t}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
