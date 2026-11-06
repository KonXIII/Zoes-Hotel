import type { Metadata } from "next";
import { PrivacyView } from "@/components/PrivacyView";
import { alternates } from "@/content/i18n";
import { privacy } from "@/content/privacy";

const p = privacy("en");
export const metadata: Metadata = { title: p.meta.title, description: p.meta.description, alternates: alternates("/privacy", "en") };

export default function Page() {
  return <PrivacyView locale="en" />;
}
