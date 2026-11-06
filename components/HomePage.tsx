/*
 * Zoe's homepage. Art direction (art-direction.md) leads, with the owner's reference Aurelia
 * (references/sites/aurelia-template.framer.website/DESIGN.md) for composition:
 * full-bleed hero + booking bar, big serif, room cards with a facts row, a sea "evening"
 * band for the suites (day/night switch), a gallery, distances set large, a photo close.
 * Deliberately overrides taste-skill's "place" restrictions (owner's call, 2026-11-06).
 */
import Image from "next/image";
import { BlurWords } from "@/components/BlurWords";
import { BookingBar } from "@/components/BookingBar";
import { DayNight } from "@/components/DayNight";
import { Motion } from "@/components/Motion";
import { ScrollFx } from "@/components/ScrollFx";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Arrow, Icon, Sketch, wrap } from "@/components/ui";
import { BOOKING_URL } from "@/content/home";
import { getHome, getHotel } from "@/content/index";
import { href, type Locale } from "@/content/i18n";
import { ui } from "@/content/ui";

export function HomePage({ locale }: { locale: Locale }) {
  const home = getHome(locale);
  const hotel = getHotel(locale);
  const t = ui(locale);
  const { hero, intro, rooms, suites, dining, location, faq, close } = home;

  return (
    <>
      <SiteHeader locale={locale} />

      <main id="top">
        {/* HERO: the hotel at dusk, the words on the photo, the booking bar on its lower edge */}
        <section id="main" data-hero aria-labelledby="hero-h" className="relative isolate flex min-h-[100svh] flex-col justify-end pt-[72px]">
          <Image src={hero.photo.src} alt={hero.photo.alt} fill priority sizes="100vw" className="hero-photo hero-zoom -z-10 object-cover" style={{ objectPosition: hero.photo.pos }} />
          <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />
          <div className={`${wrap} pb-24 md:pb-10`}>
            <h1 id="hero-h" className="display hero-text-shadow font-medium text-balance text-[36px] text-cream sm:text-[44px] md:text-[68px] lg:text-[88px]">
              <BlurWords lines={hero.h1} step={70} />
            </h1>
            <p style={{ ["--d" as string]: "520ms" }} className="hero-rise hero-text-shadow mt-5 max-w-[46ch] text-[17px] leading-relaxed text-cream md:mt-7 md:text-[20px]">{hero.lead}</p>
            <div style={{ ["--d" as string]: "680ms" }} className="hero-rise mt-10 hidden md:block">
              <BookingBar locale={locale} />
            </div>
          </div>
        </section>

        {/* INTRO: the owner's own welcome, beside two photographs of the garden */}
        <section aria-labelledby="intro-h" className="relative isolate overflow-hidden py-24 md:py-36">
          <Sketch name="lindos" />
          <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12 lg:gap-6`}>
            <div className="lg:col-span-5">
              <h2 id="intro-h" data-title className="display text-[44px] md:text-[64px]">{intro.h2}</h2>
              <div className="mt-8 space-y-5 text-[18px] leading-[1.7] text-ink/90">
                {intro.text.map((t) => <p key={t}>{t}</p>)}
              </div>
              <p className="display mt-8 text-[26px] italic text-blue">{intro.sign}</p>
              <dl data-reveal className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-8">
                {intro.facts.map(([n, l]) => (
                  <div key={l}>
                    <dt className="display text-[36px] md:text-[44px]">{n}</dt>
                    <dd className="mt-1 text-[15px] leading-snug text-muted">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative lg:col-span-6 lg:col-start-7">
              <div className="relative w-[78%]">
                <div aria-hidden="true" className="arch-line" />
                <div className="photo arch relative aspect-[4/5]" data-frame-parallax>
                  <Image src={intro.photos[0].src} alt={intro.photos[0].alt} fill sizes="(min-width:1024px) 460px, 78vw" className="object-cover" />
                </div>
              </div>
              <div className="photo absolute bottom-[-8%] right-0 aspect-[4/3] w-[52%] outline outline-[10px] outline-limestone">
                <Image src={intro.photos[1].src} alt={intro.photos[1].alt} fill sizes="(min-width:1024px) 320px, 52vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* ROOMS: two big cards, photo, name, facts row, one line, the booking button */}
        <section id="rooms" aria-labelledby="rooms-h" className="relative isolate overflow-hidden bg-sand py-24 md:py-32">
          <Sketch name="old-town" />
          <div className={wrap}>
            <div className="grid gap-6 md:grid-cols-12 md:items-end">
              <h2 id="rooms-h" data-title className="display text-[44px] md:col-span-6 md:text-[64px]">{rooms.h2}</h2>
              <p className="max-w-[46ch] text-[17px] text-muted md:col-span-5 md:col-start-8">{rooms.lead}</p>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-6">
              {rooms.items.map((r) => (
                <article key={r.name} data-reveal className="room-card group flex flex-col bg-limestone">
                  <a href={href(locale, `/rooms/${r.slug}`)} className="photo relative block aspect-[4/3]" aria-label={t.home.seeAria(r.name)}>
                    <Image src={r.photo.src} alt={r.photo.alt} fill sizes="(min-width:768px) 640px, 100vw" className="object-cover" />
                    <span className="absolute left-4 top-4 rounded-[var(--radius-field)] bg-sea px-3 py-1.5 text-[14px] font-medium text-cream">{r.tag}</span>
                  </a>
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <h3 className="display text-[34px] md:text-[40px]"><a href={href(locale, `/rooms/${r.slug}`)}>{r.name}</a></h3>
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
                      <li className="flex items-center gap-2"><Icon name="size" />{r.size}</li>
                      <li className="flex items-center gap-2"><Icon name="bed" />{r.beds}</li>
                      <li className="flex items-center gap-2"><Icon name="guests" />{r.guests}</li>
                    </ul>
                    <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ink/85">{r.text}</p>
                    <div className="mt-auto pt-8">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <a href={href(locale, `/rooms/${r.slug}`)} className="btn-secondary">{t.home.seeRoom} <Arrow /></a>
                        <a href={BOOKING_URL} rel="noopener" className="link tap text-[16px]">{t.home.bookThis}</a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SUITES: the evening band, the same verandas by day and by night */}
        <section id="suites" data-dark aria-labelledby="suites-h" className="bg-sea py-24 text-cream md:py-36">
          <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12 lg:gap-6`}>
            <div className="lg:col-span-5">
              <h2 id="suites-h" data-title className="display text-[44px] md:text-[64px]">{suites.h2}</h2>
              <p className="mt-7 max-w-[44ch] text-[18px] leading-[1.7] text-cream/85">{suites.text}</p>
              <ul className="mt-9 space-y-4">
                {suites.points.map((p) => (
                  <li key={p} className="flex items-baseline gap-4 border-b border-cream/15 pb-4 text-[17px]">
                    <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-gold" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <a href={BOOKING_URL} rel="noopener" className="btn-primary mt-10">{suites.cta} <Arrow /></a>
            </div>
            <div className="lg:col-span-7">
              <DayNight day={suites.day} night={suites.night} labels={t.dayNight} />
            </div>
          </div>
        </section>

        {/* POOL AND DINING: a gallery, one large and four smaller */}
        <section id="dining" aria-labelledby="dining-h" className="relative isolate overflow-hidden py-24 md:py-36">
          <Sketch name="mandraki" />
          <div className={wrap}>
            <div className="grid gap-6 md:grid-cols-12 md:items-end">
              <h2 id="dining-h" data-title className="display text-[44px] md:col-span-7 md:text-[64px]">{dining.h2}</h2>
              <p className="max-w-[46ch] text-[17px] text-muted md:col-span-5">{dining.lead}</p>
            </div>
            <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4" data-assemble>
              {dining.photos.map((p, i) => (
                <div key={p.src} className={`photo relative ${i === 0 ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto" : "aspect-square"}`}>
                  <Image src={p.src} alt={p.alt} fill sizes={i === 0 ? "(min-width:768px) 640px, 100vw" : "(min-width:768px) 320px, 50vw"} className="object-cover" style={{ objectPosition: p.pos }} />
                </div>
              ))}
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-3 text-[16px] text-muted sm:grid-cols-2 md:grid-cols-4">
              {dining.extras.map((x) => <li key={x} className="border-t border-line pt-3">{x}</li>)}
            </ul>
          </div>
        </section>

        {/* LOCATION: distances set large, beside the garden */}
        <section id="location" aria-labelledby="location-h" className="relative isolate overflow-hidden bg-sand py-24 md:py-32">
          <Sketch name="anthony-quinn-bay" faint />
          <div className={`${wrap} grid gap-14 lg:grid-cols-12 lg:gap-6`}>
            <div className="lg:col-span-5">
              <h2 id="location-h" data-title className="display text-[44px] md:text-[64px]">{location.h2}</h2>
              <p className="mt-7 max-w-[44ch] text-[17px] leading-relaxed text-muted">{location.lead}</p>
              <address className="mt-9 not-italic text-[18px] leading-relaxed">
                {hotel.address[0]}<br />{hotel.address[1]}
              </address>
              <a href={hotel.mapUrl} rel="noopener" className="btn-secondary mt-6">{locale === "el" ? "Οδηγίες πρόσβασης" : "Get directions"} <Arrow /></a>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <dl className="grid grid-cols-2 gap-x-6">
                {location.distances.map(([d, l]) => (
                  <div key={l} data-reveal className="border-b border-line py-5">
                    <dt className="display text-[36px] md:text-[48px]">{d}</dt>
                    <dd className="mt-1 text-[15px] leading-snug text-muted">{l}</dd>
                  </div>
                ))}
              </dl>
              <div className="photo relative mt-8 aspect-[21/9]">
                <Image src={location.photo.src} alt={location.photo.alt} fill sizes="(min-width:1024px) 640px, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* QUESTIONS: the owner's FAQ */}
        <section id="questions" aria-labelledby="faq-h" className="relative isolate overflow-hidden py-24 md:py-32">
          <Sketch name="ladiko-hills" />
          <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:gap-6`}>
            <div className="lg:col-span-4">
              <h2 id="faq-h" data-title className="display text-[44px] md:text-[64px]">{faq.h2}</h2>
              <p className="mt-6 max-w-[34ch] text-[17px] text-muted">{faq.lead}</p>
              <div className="mt-4 grid justify-items-start text-[17px]">
                <a className="link tap" href={hotel.phoneHref}>{hotel.phone}</a>
                <a className="link tap" href={`mailto:${hotel.email}`}>{hotel.email}</a>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              {faq.items.map(([q, a]) => (
                <details key={q} data-reveal className="faq group border-b border-line">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-medium">
                    {q}
                    <span className="faq-icon" aria-hidden="true" />
                  </summary>
                  <p className="max-w-[60ch] pb-6 text-[17px] leading-relaxed text-ink/80">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSE: the swim-up pool at night, one line and the booking button */}
        <section data-dark aria-labelledby="close-h" className="relative isolate flex min-h-[80svh] items-end">
          <Image src={close.photo.src} alt={close.photo.alt} fill sizes="100vw" className="-z-10 object-cover" />
          <div className="close-scrim absolute inset-0 -z-10" aria-hidden="true" />
          <div className={`${wrap} pb-16 md:pb-24`}>
            <h2 id="close-h" data-title className="display max-w-[14ch] text-[48px] text-cream md:text-[88px]">{close.h2}</h2>
            <p className="mt-5 text-[18px] text-cream/90">{close.lead}</p>
            <a href={BOOKING_URL} rel="noopener" className="btn-primary mt-9">{home.action} <Arrow /></a>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </>
  );
}
