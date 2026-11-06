"use client";
import { useEffect } from "react";

// The root layout renders <html lang="en">; Greek pages set it to "el" (and the wrapper div carries lang="el"
// for the server-rendered HTML). Restores "en" when leaving.
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => { document.documentElement.lang = prev; };
  }, [lang]);
  return null;
}
