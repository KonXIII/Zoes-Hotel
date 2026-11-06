import Image from "next/image";
import { Motion } from "@/components/Motion";
import { ScrollFx } from "@/components/ScrollFx";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Arrow, Icon, Sketch, wrap } from "@/components/ui";
import { BOOKING_URL } from "@/content/home";
import { getHotel, getRooms } from "@/content/index";
import { href, type Locale } from "@/content/i18n";
import type { Room } from "@/content/rooms";
import { ui } from "@/content/ui";

export function RoomView({ room, locale }: { room: Room; locale: Locale }) {
  const hotel = getHotel(locale);
  const t = ui(locale).room;
  const other = getRooms(locale).find((r) => r.slug !== room.slug)!;
  const base = locale === "el" ? "https://zoes.gr/el" : "https://zoes.gr";
  const tourSrc = `/tour/index.html?embed=1&room=${room.tourRoom}`; // the tour itself is English-only for now

  const schema = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.lead,
    floorSize: { "@type": "QuantitativeValue", value: room.facts.size.match(/\d+/)?.[0], unitCode: "MTK" },
    occupancy: { "@type": "QuantitativeValue", maxValue: room.tourRoom === "suite" ? 2 : 4 },
    containedInPlace: { "@type": "Hotel", name: hotel.name, url: "https://zoes.gr/" },
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: `${base}/` },
      { "@type": "ListItem", position: 2, name: t.breadcrumbRooms, item: `${base}/#rooms` },
      { "@type": "ListItem", position: 3, name: room.name, item: `${base}/rooms/${room.slug}` },
    ],
  };

  return (
    <>
      <SiteHeader locale={locale} />

      <main id="top" className="pt-[80px]">
        {/* HEAD: name, one line, the facts row, book + tour */}
        <section id="main" aria-labelledby="room-h" className="relative isolate overflow-hidden pb-10 pt-10 md:pb-14 md:pt-16">
          <div className={wrap}>
            <nav aria-label="Breadcrumb" className="text-[14px] text-muted">
              <a className="nav-link" href={href(locale, "/")}>{t.breadcrumbHome}</a> <span aria-hidden="true">/</span>{" "}
              <a className="nav-link" href={href(locale, "/#rooms")}>{t.breadcrumbRooms}</a> <span aria-hidden="true">/</span>{" "}
              <span aria-current="page" className="text-ink">{room.name}</span>
            </nav>
            <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
              <div className="lg:col-span-7">
                <span className="inline-block rounded-[var(--radius-field)] bg-sea px-3 py-1.5 text-[14px] font-medium text-cream">{room.tag}</span>
                <h1 id="room-h" className="display mt-5 text-[52px] md:text-[80px] lg:text-[96px]">{room.h1}</h1>
                <p className="mt-5 max-w-[50ch] text-[18px] leading-relaxed text-ink/85 md:text-[20px]">{room.lead}</p>
              </div>
              <div className="lg:col-span-5">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-[16px]">
                  <li className="flex items-start gap-2.5"><Icon name="size" />{room.facts.size}</li>
                  <li className="flex items-start gap-2.5"><Icon name="bed" />{room.facts.beds}</li>
                  <li className="flex items-start gap-2.5"><Icon name="guests" />{room.facts.guests}</li>
                  <li className="flex items-start gap-2.5"><Icon name="view" />{room.facts.view}</li>
                </ul>
                <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6">
                  <a href={BOOKING_URL} rel="noopener" className="btn-primary justify-center">{t.book} <Arrow /></a>
                  <a href="#tour" className="btn-secondary justify-center">{t.tour}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BIG PHOTO */}
        <div className={wrap}>
          <div className="photo relative aspect-[4/3] md:aspect-[21/9]" data-frame-parallax>
            <Image src={room.hero.src} alt={room.hero.alt} fill priority sizes="(min-width:1320px) 1240px, 100vw" className="object-cover" style={{ objectPosition: room.hero.pos }} />
          </div>
        </div>

        {/* 3D TOUR: the room tour (public/tour), locked to this room */}
        <section id="tour" aria-labelledby="tour-h" className="py-20 md:py-28">
          <div className={wrap}>
            <div className="grid gap-6 md:grid-cols-12 md:items-end">
              <h2 id="tour-h" data-title className="display text-[40px] md:col-span-7 md:text-[60px]">{t.tourH2}</h2>
              <p className="max-w-[44ch] text-[17px] text-muted md:col-span-5">
                {t.tourText(room.tourRoom === "suite" ? t.veranda : t.balcony)}
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-[var(--radius-card)] bg-sand shadow-[0_30px_80px_-40px_rgb(22_43_40/0.5)]">
              <iframe
                src={tourSrc}
                title={t.tourTitle(room.name)}
                loading="lazy"
                allow="fullscreen"
                allowFullScreen
                className="block h-[78svh] max-h-[760px] min-h-[520px] w-full border-0"
              />
            </div>
            <p className="mt-4 text-[15px]">
              <a className="link tap" href={`/tour/index.html?room=${room.tourRoom}`} target="_blank" rel="noopener">{t.tourFull}</a>
            </p>
          </div>
        </section>

        {/* ABOUT + AMENITIES */}
        <section aria-labelledby="about-h" className="relative isolate overflow-hidden bg-sand py-20 md:py-28">
          <Sketch name={room.tourRoom === "suite" ? "anthony-quinn-bay" : "lindos"} faint={room.tourRoom === "suite"} />
          <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:gap-6`}>
            <div className="lg:col-span-5">
              <h2 id="about-h" data-title className="display text-[40px] md:text-[60px]">{room.about.h2}</h2>
              <div className="mt-7 space-y-5 text-[18px] leading-[1.7] text-ink/90">
                {room.about.text.map((t) => <p key={t}>{t}</p>)}
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <h3 className="text-[15px] font-medium text-muted">{t.inRoom}</h3>
              <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li key={a} data-reveal className="flex items-baseline gap-3 border-b border-line py-3.5 text-[16px]">
                    <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-accent" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section aria-labelledby="gallery-h" className="overflow-hidden py-20 md:py-28">
          <div className={wrap}>
            <h2 id="gallery-h" data-title className="display text-[40px] md:text-[60px]">{t.photosH2(room.name)}</h2>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4" data-assemble>
              {room.gallery.map((g, i) => (
                <div key={g.src} className={`photo relative ${i === 0 ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto" : "aspect-square"}`}>
                  <Image src={g.src} alt={g.alt} fill sizes={i === 0 ? "(min-width:768px) 640px, 100vw" : "(min-width:768px) 320px, 50vw"} className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GOOD TO KNOW */}
        <section aria-labelledby="know-h" className="pb-20 md:pb-28">
          <div className={`${wrap} grid gap-10 lg:grid-cols-12 lg:gap-6`}>
            <h2 id="know-h" data-title className="display text-[40px] md:text-[60px] lg:col-span-4">{t.goodToKnow}</h2>
            <dl className="lg:col-span-7 lg:col-start-6">
              {room.goodToKnow.map(([k, v]) => (
                <div key={k} data-reveal className="grid gap-1 border-b border-line py-5 sm:grid-cols-[200px_1fr] sm:gap-6">
                  <dt className="text-[15px] font-medium text-muted">{k}</dt>
                  <dd className="text-[17px]">{v}</dd>
                </div>
              ))}
              <div className="grid gap-1 border-b border-line py-5 sm:grid-cols-[200px_1fr] sm:gap-6">
                <dt className="text-[15px] font-medium text-muted">{t.cancellation}</dt>
                <dd className="text-[17px]">{t.cancellationText} <a className="link" href={href(locale, "/#questions")}>{t.allQuestions}</a></dd>
              </div>
            </dl>
          </div>
        </section>

        {/* THE OTHER ROOM + BOOK */}
        <section data-dark aria-labelledby="other-h" className="bg-sea py-20 text-cream md:py-28">
          <div className={`${wrap} grid items-center gap-10 md:grid-cols-12 md:gap-6`}>
            <div className="md:col-span-5">
              <p className="text-[15px] font-medium text-gold">{t.also}</p>
              <h2 id="other-h" className="display mt-3 text-[40px] md:text-[56px]">{other.name}</h2>
              <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-cream/85">{other.lead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={BOOKING_URL} rel="noopener" className="btn-primary">{t.bookRoom} <Arrow /></a>
                <a href={href(locale, `/rooms/${other.slug}`)} className="footer-link tap text-[16px] text-cream">{t.see(other.name)}</a>
              </div>
            </div>
            <a href={href(locale, `/rooms/${other.slug}`)} className="photo relative block aspect-[4/3] md:col-span-6 md:col-start-7" aria-label={other.name}>
              <Image src={other.hero.src} alt={other.hero.alt} fill sizes="(min-width:768px) 620px, 100vw" className="object-cover" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumbs]) }} />
      <Motion />
      <ScrollFx />
    </>
  );
}
