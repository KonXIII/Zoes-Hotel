import type { Metadata } from "next";
import { HtmlLang } from "@/components/HtmlLang";
import { PrivacyView } from "@/components/PrivacyView";
import { alternates } from "@/content/i18n";
import { privacy } from "@/content/privacy";

const p = privacy("el");
export const metadata: Metadata = { title: p.meta.title, description: p.meta.description, alternates: alternates("/privacy", "el") };

export default function Page() {
  return (
    <div lang="el">
      <HtmlLang lang="el" />
      <PrivacyView locale="el" />
    </div>
  );
}
