// Interface wording that lives in components (not page content). EN + EL.
import type { Locale } from "./i18n";

const en = {
  skip: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  langSwitch: "Ελληνικά",
  langSwitchShort: "EL",
  booking: { label: "Check availability", arrival: "Arrival", departure: "Departure", nights: "Nights", nightsOption: (n: number) => (n === 1 ? "1 night" : `${n} nights`), adults: "Adults (12+)", children: "Children", submit: "Check availability", bestRate: "Best rate guaranteed when you book direct" },
  dayNight: { group: "Time of day", day: "Afternoon", night: "Evening" },
  footer: {
    lede: (season: string) => `A family-run hotel in Ladiko, Faliraki. ${season}.`,
    visit: "Visit", contact: "Contact", stay: "Stay",
    checkInOut: (i: string, o: string) => `Check-in ${i} · Check-out ${o}`,
    star: "3-star hotel · Rhodes, Greece",
  },
  room: {
    breadcrumbHome: "Home", breadcrumbRooms: "Rooms",
    book: "Book this room", tour: "Take the 3D tour",
    tourH2: "Walk through the room",
    tourText: (place: string) => `Tap the dots to move from the bed to the bathroom and out to the ${place}. Drag to look around. Every view is a real photo.`,
    veranda: "veranda", balcony: "balcony",
    tourTitle: (name: string) => `3D tour of the ${name}`,
    tourFull: "Open the tour full screen",
    inRoom: "In the room",
    photosH2: (name: string) => `Photos of the ${name.toLowerCase()}`,
    goodToKnow: "Good to know",
    cancellation: "Cancellation",
    cancellationText: "Free up to 7 days before arrival.",
    allQuestions: "All booking questions",
    also: "Also at Zoe's",
    see: (name: string) => `See the ${name.toLowerCase()}`,
    bookRoom: "Book a room",
  },
  home: { seeRoom: "See the room and 3D tour", bookThis: "Book this room", seeAria: (n: string) => `See the ${n}` },
};

const el: typeof en = {
  skip: "Μετάβαση στο περιεχόμενο",
  openMenu: "Άνοιγμα μενού",
  closeMenu: "Κλείσιμο μενού",
  langSwitch: "English",
  langSwitchShort: "EN",
  booking: { label: "Έλεγχος διαθεσιμότητας", arrival: "Άφιξη", departure: "Αναχώρηση", nights: "Διανυκτερεύσεις", nightsOption: (n: number) => (n === 1 ? "1 νύχτα" : `${n} νύχτες`), adults: "Ενήλικες (12+)", children: "Παιδιά", submit: "Διαθεσιμότητα", bestRate: "Εγγύηση καλύτερης τιμής για απευθείας κρατήσεις" },
  dayNight: { group: "Ώρα της ημέρας", day: "Απόγευμα", night: "Βράδυ" },
  footer: {
    lede: (season: string) => `Οικογενειακό ξενοδοχείο στο Λαδικό, Φαληράκι. ${season}.`,
    visit: "Τοποθεσία", contact: "Επικοινωνία", stay: "Διαμονή",
    checkInOut: (i: string, o: string) => `Check-in ${i} · Check-out ${o}`,
    star: "Ξενοδοχείο 3 αστέρων · Ρόδος",
  },
  room: {
    breadcrumbHome: "Αρχική", breadcrumbRooms: "Δωμάτια",
    book: "Κράτηση δωματίου", tour: "Εικονική περιήγηση",
    tourH2: "Περιηγηθείτε στο δωμάτιο",
    tourText: (place: string) => `Πατήστε τις τελείες για να περάσετε από το κρεβάτι στο μπάνιο και έξω στ${place === "βεράντα" ? "η" : "ο"} ${place}. Σύρετε για να κοιτάξετε γύρω. Κάθε εικόνα είναι πραγματική φωτογραφία.`,
    veranda: "βεράντα", balcony: "μπαλκόνι",
    tourTitle: (name: string) => `Εικονική περιήγηση: ${name}`,
    tourFull: "Άνοιγμα της περιήγησης σε πλήρη οθόνη",
    inRoom: "Στο δωμάτιο",
    photosH2: () => "Φωτογραφίες",
    goodToKnow: "Χρήσιμες πληροφορίες",
    cancellation: "Ακύρωση",
    cancellationText: "Δωρεάν έως 7 ημέρες πριν από την άφιξη.",
    allQuestions: "Όλες οι ερωτήσεις κράτησης",
    also: "Επίσης στο Zoe's",
    see: () => "Δείτε το δωμάτιο",
    bookRoom: "Κράτηση δωματίου",
  },
  home: { seeRoom: "Το δωμάτιο και η εικονική περιήγηση", bookThis: "Κράτηση", seeAria: (n: string) => `Δείτε: ${n}` },
};

export const ui = (locale: Locale) => (locale === "el" ? el : en);
