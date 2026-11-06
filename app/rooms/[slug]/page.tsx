import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoomView } from "@/components/RoomView";
import { getRoom, getRooms } from "@/content/index";
import { alternates } from "@/content/i18n";

const LOCALE = "en" as const;

export function generateStaticParams() {
  return getRooms(LOCALE).map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const room = getRoom(LOCALE, (await params).slug);
  if (!room) return {};
  return {
    title: room.meta.title,
    description: room.meta.description,
    alternates: alternates(`/rooms/${room.slug}`, LOCALE),
    openGraph: { images: [{ url: room.hero.src }] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const room = getRoom(LOCALE, (await params).slug);
  if (!room) notFound();
  return <RoomView room={room} locale={LOCALE} />;
}
