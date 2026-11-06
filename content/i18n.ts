// Locales: English at "/", Greek at "/el" (seo-plan.md). Same slugs in both languages.
export type Locale = "en" | "el";
export const locales: Locale[] = ["en", "el"];

/** Prefix a site path for a locale: href("el", "/rooms/x") → "/el/rooms/x"; href("el", "/#rooms") → "/el#rooms". */
export function href(locale: Locale, path: string): string {
  if (locale === "en") return path;
  if (path === "/") return "/el";
  if (path.startsWith("/#")) return `/el${path.slice(1)}`;
  return `/el${path}`;
}

/** The same page in the other language (used by the language switch). */
export function switchLocalePath(pathname: string, hash = ""): { locale: Locale; path: string } {
  if (pathname === "/el" || pathname.startsWith("/el/")) {
    const rest = pathname.slice(3) || "/";
    return { locale: "en", path: rest + hash };
  }
  return { locale: "el", path: (pathname === "/" ? "/el" : `/el${pathname}`) + hash };
}

/** hreflang alternates for a path (as written for English). */
export function alternates(path: string, locale: Locale) {
  return {
    canonical: href(locale, path),
    languages: { en: path, el: href("el", path), "x-default": path },
  };
}
