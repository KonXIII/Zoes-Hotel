// Homepage content (EN). Plain typed data so a headless CMS can take it over later (brief.md §5).
// Facts and wording come from the owner's texts (content/source-texts.md). No prices, reviews or perks yet.

export const BOOKING_URL = "https://zoeshotelfaliraki.reserve-online.net/";

export type Photo = { src: string; alt: string; w: number; h: number; pos?: string };

export const hotel = {
  name: "Zoe's Hotel & Suites",
  short: "Zoe's",
  address: ["Ladiko, Faliraki", "851 05 Rhodes, Greece"],
  phone: "+30 22410 85140",
  phoneHref: "tel:+302241085140",
  mobile: "+30 694 769 6008",
  mobileHref: "tel:+306947696008",
  email: "info@zoes.gr",
  mapUrl: "https://www.openstreetmap.org/search?query=Zoes%20Hotel%20Ladiko%20Faliraki%20Rhodes",
  season: "Open 15 May to 15 October",
  checkIn: "15:00",
  checkOut: "11:00",
};

export const home = {
  meta: {
    title: "Zoe's Hotel Faliraki: family rooms and swim-up suites",
    description:
      "Family-run hotel in Ladiko, Faliraki: 48 rooms for families and 10 adults-only swim-up suites, 900 m from Ladiko beach. Book direct.",
  },
  nav: [
    { label: "Rooms", href: "/#rooms" },
    { label: "Suites", href: "/#suites" },
    { label: "Pool & dining", href: "/#dining" },
    { label: "Location", href: "/#location" },
    { label: "Questions", href: "/#questions" },
  ],
  action: "Book a room",

  hero: {
    h1: ["A family hotel in Faliraki,", "with swim-up suites"],
    lead: "Gardens, a 200 m² pool and the Zoes restaurant, a 15-minute walk from Ladiko beach and Anthony Quinn Bay.",
    photo: { src: "/photos/balcony-view.webp", alt: "View from a room balcony over the garden, the pool and the green hills of Ladiko", w: 930, h: 620, pos: "62% 55%" } as Photo,
  },

  intro: {
    h2: "Dear future guests",
    text: [
      "Zoes is a family-run hotel on the outskirts of Faliraki, in the Ladiko area, surrounded by gardens and a large swimming pool with a bar and a restaurant.",
      "It's close enough to Faliraki's centre for an evening out, and far enough away for relaxed, peaceful holidays.",
    ],
    sign: "The Zoes family",
    photos: [
      { src: "/photos/garden-path.webp", alt: "Garden path between lawns and trees down to the pool, with the hills behind", w: 930, h: 620 },
      { src: "/photos/pool-deck-tall.webp", alt: "The children's pool and timber deck in the afternoon sun", w: 721, h: 1080 },
    ] as Photo[],
    facts: [
      ["48", "Superior Rooms for families"],
      ["10", "swim-up suites, adults only"],
      ["900 m", "to Ladiko beach"],
    ] as [string, string][],
  },

  rooms: {
    h2: "Rooms and suites",
    lead: "Every room has its own balcony or veranda, air conditioning and free Wi-Fi. Buffet breakfast is served every morning.",
    items: [
      {
        name: "Superior Room",
        slug: "superior-rooms",
        tag: "For families",
        size: "32 m²",
        beds: "Double + 2 sofa beds",
        guests: "3 adults, or 2 + 2 kids",
        text: "A furnished balcony over the garden, the pool or the mountains, with a fridge, kettle, safe and satellite TV.",
        photo: { src: "/photos/superior-room.webp", alt: "Superior Room with an oak headboard, teal cushions and a balcony door", w: 1920, h: 1280 } as Photo,
      },
      {
        name: "Swim-Up Suite",
        slug: "swim-up-suites",
        tag: "Adults only, 21+",
        size: "30 m² + 13 m² veranda",
        beds: "King + sofa bed",
        guests: "2 adults",
        text: "Two loungers on your own veranda, with steps straight into the suites' pool and a 45-inch smart TV inside.",
        photo: { src: "/photos/swim-up-suite-room.webp", alt: "Swim-Up Suite with a round mirror, oak slats and the pool through the glass door", w: 1024, h: 681 } as Photo,
      },
    ],
  },

  suites: {
    h2: "Swim-up suites, for adults only",
    text: "Ten suites for guests over 21, each opening onto the pool. Quiet in the afternoon, and lit up once the evening comes.",
    points: ["Steps from your veranda into the pool", "Two loungers, chairs and a table outside", "King-size bed and a sofa bed"],
    day: { src: "/photos/suite-terraces-day.webp", alt: "Suite verandas with loungers along the swim-up pool in the afternoon", w: 930, h: 620 } as Photo,
    night: { src: "/photos/suite-terraces-night.webp", alt: "The same suite verandas at night with the pool lit up", w: 930, h: 620 } as Photo,
    cta: "Book a suite",
  },

  dining: {
    h2: "Pool, bar and the Zoes restaurant",
    lead: "A 200 m² pool and a children's pool in the garden, free loungers and umbrellas, a pool snack bar, and Greek and international dishes all day.",
    photos: [
      { src: "/photos/pool-night-wide.webp", alt: "The main pool lit blue at night with the bar and restaurant beside it", w: 1024, h: 592 },
      { src: "/photos/breakfast-poolside.webp", alt: "Breakfast of croissant, eggs, fruit and juice by the pool", w: 930, h: 620, pos: "50% 65%" },
      { src: "/photos/restaurant.webp", alt: "The hotel restaurant with tables laid and the garden through the windows", w: 930, h: 620 },
      { src: "/photos/breakfast-buffet.webp", alt: "Breakfast buffet with fruit, yoghurt and cold cuts", w: 930, h: 620 },
      { src: "/photos/pool-garden-day.webp", alt: "Sun loungers and umbrellas around the pool on a clear day", w: 1024, h: 463 },
    ] as Photo[],
    extras: ["Children's pool and playground", "Pool table and games room", "Mini market and mini gym", "Free parking and Wi-Fi"],
  },

  location: {
    h2: "Between two beaches and Faliraki",
    lead: "Zoes is practically on a straight road from the airport. Faliraki, the biggest resort on Rhodes, is close by, and the hotel stays quiet.",
    distances: [
      ["900 m", "Ladiko beach"],
      ["15 min", "on foot to Anthony Quinn Bay"],
      ["1.5 km", "Faliraki centre"],
      ["6 km", "Kallithea Springs"],
      ["15 km", "Rhodes Old Town"],
      ["16 km", "Airport, about 20 min and €33 by taxi"],
    ] as [string, string][],
    photo: { src: "/photos/garden-lawn.webp", alt: "The hotel's lawns and pool area with the hills of Ladiko behind", w: 1024, h: 455 } as Photo,
  },

  faq: {
    h2: "Before you book",
    lead: "Anything else? Call us or write to us. A family member answers.",
    items: [
      ["Are taxes included in the price?", "Yes. Prices in our online booking system are final and include all taxes."],
      ["Do I pay in advance?", "A deposit confirms your booking. We accept Visa, MasterCard and American Express."],
      ["What is the cancellation policy?", "Free up to 7 days before arrival. Later changes or cancellations cost 30% of the stay, and a no-show 100%. Non-refundable rates are charged in full when you book."],
      ["Can I book by phone or email?", "Yes. Call +30 22410 85140 or email info@zoes.gr. If you don't have a credit card, ask us for our bank details."],
      ["Can children stay in the suites?", "No. The swim-up suites are for adults over 21. Families stay in the Superior Rooms."],
      ["How do I get here from the airport?", "A taxi takes about 20 minutes and costs around €33 for up to 4 people. There are always taxis waiting."],
      ["Can I bring my pet?", "Unfortunately we do not accept pets."],
    ] as [string, string][],
  },

  close: {
    h2: "Book direct with the family",
    lead: "Best rate guaranteed when you book direct. Open 15 May to 15 October.",
    photo: { src: "/photos/suites-pool-night.webp", alt: "The swim-up pool glowing at night beside the suites", w: 1024, h: 626 } as Photo,
  },
};

export type HomeContent = typeof home;
export type HotelContent = typeof hotel;
