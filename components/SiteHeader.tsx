"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "@/content/home";
import { getHome, getHotel } from "@/content/index";
import { href, switchLocalePath, type Locale } from "@/content/i18n";
import { ui } from "@/content/ui";

/*
 * The nav: one frosted "liquid glass" bar (the owner's Nutrify material, globals.css → GLASS BAR),
 * fixed at the top of every page, always the same. The official logo sits in it unchanged.
 * Links in the middle, "Book a room" on the right. Phones: logo + menu; booking is the pinned bottom bar.
 */
export function SiteHeader({ locale = "en" }: { locale?: Locale }) {
  const home = getHome(locale);
  const hotel = getHotel(locale);
  const t = ui(locale);
  const pathname = usePathname();
  const other = switchLocalePath(pathname || "/");
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasHero, setHasHero] = useState(false);

  const lenis = useLenis();
  useEffect(() => {
    // the menu is a modal: lock the page through Lenis (overflow alone doesn't stop Lenis)
    if (open) lenis?.stop(); else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  // The glass is nearly clear; over a [data-dark] band it frosts up so the logo and links stay readable.
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const under = document.elementsFromPoint(window.innerWidth / 2, 33).find((el) => !el.closest("header"));
      setDark(!!under?.closest("[data-dark]"));
      setScrolled(window.scrollY > 16);
      setHasHero(!!document.querySelector("[data-hero]"));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, []);

  return (
    <>
    <header data-ground={dark && !open ? "dark" : "light"} data-scrolled={scrolled && !open ? "true" : "false"} data-onphoto={hasHero && !scrolled && !open ? "true" : "false"} className="glass-bar fixed z-50">
      <span className="glass-bar__warp" aria-hidden="true" />
      <span className="glass-bar__tint" aria-hidden="true" />
      <span className="glass-bar__edge" aria-hidden="true" />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-40 focus:bg-limestone focus:px-4 focus:py-2">
        {t.skip}
      </a>
      <div className="glass-bar__inner relative z-30 grid h-full grid-cols-[1fr_auto] items-center gap-6 px-5 md:px-10 lg:grid-cols-[1fr_auto_1fr]">
        <a href={href(locale, "/")} aria-label={hotel.name} className="justify-self-start">
          <Image src="/logo-official.png" alt="" width={1036} height={1104} priority sizes="120px" className="glass-bar__logo w-auto" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {home.nav.map((l) => (
            <a key={l.href} href={href(locale, l.href)} className="glass-bar__link nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          {!scrolled && <a href={hotel.phoneHref} className="glass-bar__link glass-bar__phone nav-link hidden whitespace-nowrap xl:inline">{hotel.phone}</a>}
          <a href={other.path} hrefLang={other.locale} lang={other.locale} aria-label={t.langSwitch} className="glass-bar__link nav-link tap px-1">{t.langSwitchShort}</a>
          <a href={BOOKING_URL} rel="noopener" className="btn-primary glass-bar__btn hidden sm:inline-flex">{home.action}</a>
          <button
            type="button"
            className="glass-bar__toggle -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-btn)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M2 6h14M2 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>

      {/* The menu sits OUTSIDE the header: the glass bar's backdrop-filter makes it the containing block for
          position:fixed children, so inside it the sheet was sized to the 66px bar and the page showed through. */}
        <div id="mobile-menu" data-lenis-prevent data-open={open ? "true" : "false"} inert={!open} className="menu-sheet fixed inset-0 z-[45] flex flex-col bg-limestone px-5 pb-8 pt-[96px] lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {home.nav.map((l, i) => (
              <a key={l.href} href={href(locale, l.href)} onClick={() => setOpen(false)} style={{ ["--i" as string]: i }} className="menu-sheet__link display border-b border-line py-4 text-[32px] text-ink">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto grid gap-3">
            <a href={hotel.phoneHref} className="text-lg text-ink">{hotel.phone}</a>
            <a href={other.path} hrefLang={other.locale} lang={other.locale} className="text-lg text-blue">{t.langSwitch}</a>
            <a href={BOOKING_URL} rel="noopener" className="btn-primary w-full justify-center">{home.action}</a>
          </div>
        </div>
    </>
  );
}
