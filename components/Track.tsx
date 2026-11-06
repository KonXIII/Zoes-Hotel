"use client";

import { Analytics } from "@vercel/analytics/next";
import { track } from "@vercel/analytics";
import { useEffect } from "react";
import { BOOKING_URL } from "@/content/home";

/*
 * Measurement (measurement-plan.md §2). Vercel Web Analytics is cookieless: no consent banner needed for it.
 * One delegated click listener instead of handlers on every link:
 *   booking_start  any link to the booking engine (or the booking bar's submit, fired in BookingBar)
 *   phone_click    tel: links
 *   email_click    mailto: links
 * Properties (max 2, no personal data): place = the section the click came from, locale.
 */
export function placeOf(el: Element): string {
  if (el.closest("header")) return "nav";
  if (el.closest("#mobile-menu")) return "menu";
  if (el.closest("footer")) return "footer";
  if (el.closest(".fixed.bottom-0")) return "phone-bar";
  return el.closest("section[id]")?.id ?? el.closest("section[aria-labelledby]")?.getAttribute("aria-labelledby")?.replace(/-h$/, "") ?? "page";
}
export const localeOf = () => (location.pathname === "/el" || location.pathname.startsWith("/el/") ? "el" : "en");

export function Track() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const props = { place: placeOf(a), locale: localeOf() };
      if (href.startsWith(BOOKING_URL)) track("booking_start", props);
      else if (href.startsWith("tel:")) track("phone_click", props);
      else if (href.startsWith("mailto:")) track("email_click", props);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return <Analytics />;
}
