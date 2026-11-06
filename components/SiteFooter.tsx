import Image from "next/image";
import { BOOKING_URL } from "@/content/home";
import { getHome, getHotel, getRooms } from "@/content/index";
import { href, type Locale } from "@/content/i18n";
import { ui } from "@/content/ui";
import { wrap } from "@/components/ui";

export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const home = getHome(locale);
  const hotel = getHotel(locale);
  const rooms = getRooms(locale);
  const t = ui(locale).footer;
  return (
    <>
      <footer className="border-t border-line bg-sand pb-28 pt-20 text-ink sm:pb-12">
        <div className={`${wrap} grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-6`}>
          <div className="col-span-2 md:col-span-4">
            <a href={href(locale, "/")} aria-label={hotel.name} className="inline-block">
              <Image src="/logo-official.png" alt="" width={1036} height={1104} sizes="220px" loading="lazy" className="h-28 w-auto" />
            </a>
            <p className="mt-6 max-w-[30ch] text-[16px] text-muted">{t.lede(hotel.season)}</p>
          </div>
          <div className="col-span-2 md:col-span-3 md:col-start-6">
            <h2 className="text-[14px] font-medium text-blue">{t.visit}</h2>
            <address className="mt-4 not-italic text-[16px] leading-relaxed text-ink/85">{hotel.address[0]}<br />{hotel.address[1]}</address>
            <p className="mt-3 text-[16px] text-ink/85">{t.checkInOut(hotel.checkIn, hotel.checkOut)}</p>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-[14px] font-medium text-blue">{t.contact}</h2>
            <ul className="mt-2 text-[16px]">
              <li><a className="footer-link tap" href={hotel.phoneHref}>{hotel.phone}</a></li>
              <li><a className="footer-link tap" href={hotel.mobileHref}>{hotel.mobile}</a></li>
              <li><a className="footer-link tap" href={`mailto:${hotel.email}`}>{hotel.email}</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-[14px] font-medium text-blue">{t.stay}</h2>
            <ul className="mt-2 text-[16px]">
              {rooms.map((r) => <li key={r.slug}><a className="footer-link tap" href={href(locale, `/rooms/${r.slug}`)}>{r.name}</a></li>)}
              {home.nav.slice(2).map((l) => <li key={l.href}><a className="footer-link tap" href={href(locale, l.href)}>{l.label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className={`${wrap} mt-16 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[14px] text-muted`}>
          <span>© 2026 {hotel.name} · <a className="footer-link" href={href(locale, "/privacy")}>{locale === "el" ? "Απόρρητο και cookies" : "Privacy and cookies"}</a></span>
          <span>{t.star}</span>
        </div>
      </footer>

      {/* Phone: the booking button always one tap away */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-limestone p-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:hidden">
        <a href={BOOKING_URL} rel="noopener" className="btn-primary w-full justify-center">{home.action}</a>
      </div>
    </>
  );
}
