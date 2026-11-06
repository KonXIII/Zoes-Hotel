"use client";

import { useEffect, useState } from "react";
import { BOOKING_URL } from "@/content/home";
import type { Locale } from "@/content/i18n";
import { ui } from "@/content/ui";
import { track } from "@vercel/analytics";

/*
 * Hands the stay to the hotel's own engine (WebHotelier, zoeshotelfaliraki.reserve-online.net), with the same fields
 * the engine asks for: arrival, nights, adults (12+), children.
 * ✅ Verified by the owner, 2026-11-06: the engine prefills from ?checkin=YYYY-MM-DD&nights=N&adults=N&children=N
 * (ISO dates). Keep DATE_FORMAT = "iso".
 */
const DATE_FORMAT: "iso" | "dmy" = "iso";
const fmt = (isoDate: string) => {
  if (DATE_FORMAT === "iso") return isoDate;
  const [y, m, d] = isoDate.split("-");
  return `${Number(d)}/${Number(m)}/${y}`;
};
const iso = (d: Date) => d.toISOString().slice(0, 10);
// suppressHydrationWarning on the fields: form-filling browser extensions (e.g. Surfshark adds data-sharkid)
// write attributes into inputs before React hydrates. It only covers that element's own attributes.

export function BookingBar({ locale = "en" }: { locale?: Locale }) {
  const t = ui(locale).booking;
  // "today" is set in the browser only (cacheComponents forbids new Date() while prerendering)
  const [today, setToday] = useState("");
  useEffect(() => setToday(iso(new Date())), []);
  const [arrive, setArrive] = useState("");
  const [nights, setNights] = useState("7");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = new URL(BOOKING_URL);
    if (arrive) url.searchParams.set("checkin", fmt(arrive));
    url.searchParams.set("nights", nights);
    url.searchParams.set("adults", adults);
    url.searchParams.set("children", children);
    track("booking_start", { place: "booking-bar", locale });
    window.location.href = url.toString();
  }

  const field = "booking-field";
  return (
    <div>
      <form onSubmit={onSubmit} aria-label={t.label} className="grid grid-cols-2 gap-x-3 gap-y-4 rounded-[var(--radius-card)] bg-limestone p-5 text-ink shadow-[0_24px_60px_-20px_rgb(22_43_40/0.55)] md:grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr_auto] md:items-end md:gap-4 md:p-6">
        <label className={field}>
          <span>{t.arrival}</span>
          <input type="date" name="checkin" min={today || undefined} value={arrive} onChange={(e) => setArrive(e.target.value)} required suppressHydrationWarning />
        </label>
        <label className={field}>
          <span>{t.nights}</span>
          <select name="nights" value={nights} onChange={(e) => setNights(e.target.value)} suppressHydrationWarning>
            {Array.from({ length: 21 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{t.nightsOption(n)}</option>)}
          </select>
        </label>
        <label className={field}>
          <span>{t.adults}</span>
          <select name="adults" value={adults} onChange={(e) => setAdults(e.target.value)} suppressHydrationWarning>
            {[1, 2, 3].map((n) => <option key={n}>{n}</option>)}
          </select>
        </label>
        <label className={field}>
          <span>{t.children}</span>
          <select name="children" value={children} onChange={(e) => setChildren(e.target.value)} suppressHydrationWarning>
            {[0, 1, 2].map((n) => <option key={n}>{n}</option>)}
          </select>
        </label>
        <button type="submit" className="btn-primary col-span-2 h-[50px] justify-center md:col-span-1">
          {t.submit}
        </button>
      </form>
      <p className="hero-text-shadow mt-3 flex items-center gap-2 text-[14px] font-medium text-cream">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 1.5l5.5 2v4c0 3.4-2.4 6-5.5 7-3.1-1-5.5-3.6-5.5-7v-4z M5.5 8l1.8 1.8L10.8 6.3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {t.bestRate}
      </p>
    </div>
  );
}
