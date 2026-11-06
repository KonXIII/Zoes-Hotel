// Room pages content (EN). Facts from content/source-texts.md (the owner's texts + booking-engine listings).
import type { Photo } from "./home";

export type Room = {
  slug: string;
  tourRoom: "superior" | "suite";
  name: string;
  tag: string;
  meta: { title: string; description: string };
  h1: string;
  lead: string;
  facts: { size: string; beds: string; guests: string; view: string };
  hero: Photo;
  about: { h2: string; text: string[] };
  amenities: string[];
  gallery: Photo[];
  goodToKnow: [string, string][];
};

const p = (src: string, alt: string, w: number, h: number, pos?: string): Photo => ({ src, alt, w, h, pos });

export const rooms: Room[] = [
  {
    slug: "superior-rooms",
    tourRoom: "superior",
    name: "Superior Room",
    tag: "For families",
    meta: {
      title: "Family rooms in Faliraki: Superior Room at Zoe's",
      description:
        "32 m² Superior Rooms at Zoe's in Ladiko, Faliraki: a double and two sofa beds for 3 adults or 2 + 2 kids, a furnished balcony, free Wi-Fi. Book direct.",
    },
    h1: "Superior Room",
    lead: "Our 48 Superior Rooms are all the same size, with a furnished balcony over the garden, the pool or the mountains.",
    facts: { size: "32 m²", beds: "Double + 2 sofa beds", guests: "3 adults, or 2 + 2 kids", view: "Garden, pool or mountain view" },
    hero: p("/photos/superior/bed.webp", "Superior Room with an oak headboard, teal cushions and the balcony door", 1920, 1280),
    about: {
      h2: "Room for the whole family",
      text: [
        "Every Superior Room is 32 m², with one double bed and two sofa beds, so it sleeps three adults, or two adults and two children.",
        "There's a private bathroom with a shower, a wardrobe, a writing desk and a furnished balcony. Air conditioning and the safe are free of charge, and the room is cleaned daily.",
      ],
    },
    amenities: [
      "Individually controlled air conditioning",
      "Private balcony with table and chairs",
      "Shower, WC and hair dryer",
      "Fridge, kettle, coffee and tea",
      "Flat-screen satellite TV",
      "Free Wi-Fi",
      "Safe deposit box",
      "Writing desk and wardrobe",
      "Direct-dial telephone and wake-up call",
      "Daily maid service",
    ],
    gallery: [
      p("/photos/superior/sofa-balcony.webp", "Sofa corner under the feather wall art, beside the balcony door", 1920, 1280),
      p("/photos/superior/desk-balcony.webp", "Desk and mirror with the balcony and hills beyond", 930, 620),
      p("/photos/superior/sofa.webp", "Grey sofa bed under three carved feather panels", 930, 620),
      p("/photos/superior/bathroom.webp", "Bathroom with a walk-in shower and a wide basin", 930, 620),
      p("/photos/superior/kettle-fridge.webp", "Oak shelf with a kettle, glasses and a small fridge", 930, 620),
    ],
    goodToKnow: [
      ["Check-in / check-out", "From 15:00 / by 11:00"],
      ["Who it suits", "Families and friends. Three adults, or two adults and two children"],
      ["Breakfast", "Buffet breakfast every morning"],
      ["Season", "Open 15 May to 15 October"],
    ],
  },
  {
    slug: "swim-up-suites",
    tourRoom: "suite",
    name: "Swim-Up Suite",
    tag: "Adults only, 21+",
    meta: {
      title: "Swim-up suites in Faliraki, adults only: Zoe's",
      description:
        "Adults-only (21+) Swim-Up Suites at Zoe's, Ladiko, Faliraki: 30 m² with a 13 m² veranda, king-size bed, swim-up access to a private pool. Book direct.",
    },
    h1: "Swim-Up Suite",
    lead: "Ten suites for adults over 21, facing the pool and the garden, each with steps from its own veranda into the water.",
    facts: { size: "30 m² + 13 m² veranda", beds: "King + sofa bed", guests: "2 adults, 21+", view: "Pool and garden" },
    hero: p("/photos/suite/dusk.webp", "Swim-Up Suite at dusk, the pool glowing beyond the glass doors", 1024, 639),
    about: {
      h2: "Your own veranda on the pool",
      text: [
        "The suites are all 30 m², with a king-size bed and a sofa bed, ideal for a couple or two friends. Children are not allowed in the suites.",
        "Outside is a 13 m² furnished veranda with two sun loungers, chairs and a table, and swim-up access to a private pool. Inside there's a 45-inch smart TV, soundproof windows and a sitting area.",
      ],
    },
    amenities: [
      "Swim-up access to a private pool",
      "13 m² veranda with 2 sun loungers",
      "45-inch smart Android TV, movie channels",
      "Individually controlled air conditioning",
      "Shower, WC and hair dryer",
      "Fridge, kettle, coffee and tea",
      "Free Wi-Fi",
      "Safe and electronic locks",
      "Soundproof windows, sitting area",
      "Pool towels and daily maid service",
    ],
    gallery: [
      p("/photos/suite/veranda-day.webp", "Suite verandas with loungers along the pool in the afternoon", 930, 620),
      p("/photos/suite/sofa-pool.webp", "Sofa bed with teal cushions and the pool through the glass door", 1024, 681),
      p("/photos/suite/basin.webp", "Round basin against a white wave-tiled wall", 930, 620),
      p("/photos/suite/suites-night.webp", "The suites and their pool lit up at night", 1024, 560),
      p("/photos/suite/spritz.webp", "A red spritz on the veranda table, the suite behind", 1024, 681),
    ],
    goodToKnow: [
      ["Check-in / check-out", "From 15:00 / by 11:00"],
      ["Who it suits", "Couples or two friends. Adults over 21 only, no children"],
      ["Breakfast", "Buffet breakfast every morning"],
      ["Season", "Open 15 May to 15 October"],
    ],
  },
];

export const roomBySlug = (slug: string) => rooms.find((r) => r.slug === slug);
