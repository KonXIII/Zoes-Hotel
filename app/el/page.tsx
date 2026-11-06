import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { HtmlLang } from "@/components/HtmlLang";
import { homeEl } from "@/content/home.el";
import { alternates } from "@/content/i18n";

export const metadata: Metadata = {
  title: homeEl.meta.title,
  description: homeEl.meta.description,
  alternates: alternates("/", "el"),
  openGraph: { locale: "el_GR" },
};

export default function Page() {
  return (
    <div lang="el">
      <HtmlLang lang="el" />
      <HomePage locale="el" />
    </div>
  );
}
