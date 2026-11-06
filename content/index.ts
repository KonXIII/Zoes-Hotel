// One place to get page content for a locale.
import type { Locale } from "./i18n";
import { home, hotel } from "./home";
import { homeEl, hotelEl } from "./home.el";
import { rooms } from "./rooms";
import { roomsEl } from "./rooms.el";

export const getHome = (l: Locale) => (l === "el" ? homeEl : home);
export const getHotel = (l: Locale) => (l === "el" ? hotelEl : hotel);
export const getRooms = (l: Locale) => (l === "el" ? roomsEl : rooms);
export const getRoom = (l: Locale, slug: string) => getRooms(l).find((r) => r.slug === slug);
