import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { home } from "@/content/home";
import { alternates } from "@/content/i18n";

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
  alternates: alternates("/", "en"),
};

export default function Page() {
  return <HomePage locale="en" />;
}
