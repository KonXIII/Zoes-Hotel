// Reference only — conversion events the site can't see on its own:
//   • a booking made inside an embedded Cal.com or Calendly iframe
//   • a tap on a tel: link (local clients get many leads by phone)
// Mount <ConversionTracking /> once in app/layout.tsx, next to <Analytics />.
// Forms you own don't need this: call track() after the request returns OK
// (see form-accessible.tsx).
//
// Events go to Vercel Web Analytics via track(). Custom events need the Vercel
// Pro plan, which allows at most 2 properties per event. Event names must match
// measurement-plan.md. No personal data: the booking payloads carry the visitor's
// name and email, and none of it is read or sent.
//
// Ported from the Cal.com, Calendly and phone-click detectors in
// coreyhaines31/marketingskills (conversion-tracking skill, MIT).
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

// Booking widgets post from their own origin. Each origin is trusted only for
// iframes whose src starts with it, and only while that iframe is on the page.
const BOOKING_FRAMES = [
  { origin: "https://app.cal.com", selector: 'iframe[src^="https://app.cal.com/"]', source: "calcom" },
  { origin: "https://cal.com", selector: 'iframe[src^="https://cal.com/"]', source: "calcom" },
  { origin: "https://calendly.com", selector: 'iframe[src^="https://calendly.com/"]', source: "calendly" },
] as const;

const ID = /^[A-Za-z0-9_-]{1,128}$/;
const CALENDLY_INVITEE =
  /^https:\/\/(?:api\.)?calendly\.com\/scheduled_events\/([A-Za-z0-9_-]{1,128})\/invitees\/([A-Za-z0-9_-]{1,128})\/?$/;

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

// The message must come from a booking iframe that is on the page right now,
// loaded from the same origin the message claims. Widgets re-create popup
// frames, so the DOM is checked live on every message.
function bookingSource(e: MessageEvent): "calcom" | "calendly" | null {
  for (const f of BOOKING_FRAMES) {
    if (e.origin !== f.origin) continue;
    for (const frame of document.querySelectorAll<HTMLIFrameElement>(f.selector)) {
      if (frame.isConnected && frame.contentWindow === e.source) return f.source;
    }
  }
  return null;
}

// Returns a stable booking id (for counting each booking once) or null.
function bookingId(source: "calcom" | "calendly", raw: unknown): string | null {
  let data = raw;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return null;
    }
  }
  if (!isObject(data)) return null;

  if (source === "calcom") {
    // Only a completed new booking. Reschedules and the deprecated V1 events
    // (which carry attendee details) never match.
    if (data.originator !== "CAL" || data.type !== "bookingSuccessfulV2") return null;
    const booking = data.data;
    if (!isObject(booking) || typeof booking.uid !== "string" || !ID.test(booking.uid)) return null;
    return `cal:${booking.uid}`;
  }

  if (data.event !== "calendly.event_scheduled") return null;
  const invitee = isObject(data.payload) && isObject(data.payload.invitee) ? data.payload.invitee.uri : null;
  if (typeof invitee !== "string") return null;
  const m = CALENDLY_INVITEE.exec(invitee);
  return m ? `calendly:${m[1]}:${m[2]}` : null;
}

export function ConversionTracking() {
  const pathname = usePathname();
  const page = useRef(pathname);
  useEffect(() => {
    page.current = pathname;
  }, [pathname]);

  // One listener for the whole visit, so a booking is counted once even if the
  // widget repeats its message after a route change.
  useEffect(() => {
    const seen = new Set<string>();
    let lastTel = { href: "", at: 0 };

    const onMessage = (e: MessageEvent) => {
      if (!e.source || e.source === window) return;
      const source = bookingSource(e);
      if (!source) return;
      const id = bookingId(source, e.data);
      if (!id || seen.has(id)) return;
      seen.add(id);
      track("booking_made", { source, page: page.current });
    };

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:" i]');
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const now = Date.now();
      if (href === lastTel.href && now - lastTel.at < 2000) return; // double-tap guard
      lastTel = { href, at: now };
      track("phone_click", { page: page.current });
    };

    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}

/* Usage — app/layout.tsx
import { Analytics } from "@vercel/analytics/next";
import { ConversionTracking } from "@/components/ConversionTracking";

<body>
  {children}
  <Analytics />
  <ConversionTracking />
</body>
*/
