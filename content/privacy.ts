// Privacy & cookies (EN + EL). Plain-language notice describing what this site actually does.
// ⚠ Not legal advice: have the hotel's accountant/lawyer confirm before launch (GDPR controller details).
import type { Locale } from "./i18n";

const en = {
  meta: { title: "Privacy and cookies: Zoe's Hotel & Suites", description: "What data the Zoe's Hotel website collects, why, and your rights. No tracking cookies." },
  h1: "Privacy and cookies",
  updated: "Last updated 6 November 2026",
  sections: [
    ["Who we are", "Zoe's Hotel & Suites, Ladiko, Faliraki, 851 05 Rhodes, Greece. Email info@zoes.gr, phone +30 22410 85140. We are responsible for the personal data described here."],
    ["What this website collects", "This website does not ask for your personal details and sets no tracking or advertising cookies. We count visits and clicks (for example, how many people open the booking page) with Vercel Web Analytics, which works without cookies and does not identify you. Our hosting provider keeps short-lived technical logs (such as IP addresses) to keep the site secure."],
    ["Bookings", "When you book, you leave our website for our booking system, run by WebHotelier (zoeshotelfaliraki.reserve-online.net). The details you enter there (name, contact details, payment) are processed to make and manage your reservation, under WebHotelier's and our own privacy terms. Card payments are handled by the payment provider, not stored by us."],
    ["Phone and email", "If you call or email us, we use your details only to answer you and to arrange your stay, and keep them for as long as needed for that and for our legal and tax obligations."],
    ["Fonts, maps and links", "Our fonts are served from this website itself. The 'Get directions' link opens OpenStreetMap in a new page; links to other sites are subject to their own privacy terms."],
    ["Cookies", "We do not use cookies on this website. Your browser may store small technical files for the site to work, which are not used to track you."],
    ["Your rights", "You can ask us to access, correct or delete your personal data, or object to its use, by emailing info@zoes.gr. You can also complain to the Hellenic Data Protection Authority (dpa.gr)."],
  ] as [string, string][],
};

const el: typeof en = {
  meta: { title: "Απόρρητο και cookies: Zoe's Hotel & Suites", description: "Ποια δεδομένα συλλέγει ο ιστότοπος του Zoe's Hotel, γιατί, και τα δικαιώματά σας. Χωρίς cookies παρακολούθησης." },
  h1: "Απόρρητο και cookies",
  updated: "Τελευταία ενημέρωση 6 Νοεμβρίου 2026",
  sections: [
    ["Ποιοι είμαστε", "Zoe's Hotel & Suites, Λαδικό, Φαληράκι, 851 05 Ρόδος. Email info@zoes.gr, τηλέφωνο +30 22410 85140. Είμαστε υπεύθυνοι για τα προσωπικά δεδομένα που περιγράφονται εδώ."],
    ["Τι συλλέγει ο ιστότοπος", "Ο ιστότοπος δεν ζητά προσωπικά σας στοιχεία και δεν χρησιμοποιεί cookies παρακολούθησης ή διαφήμισης. Μετράμε επισκέψεις και κλικ (για παράδειγμα, πόσοι ανοίγουν τη σελίδα κρατήσεων) με το Vercel Web Analytics, που λειτουργεί χωρίς cookies και δεν σας ταυτοποιεί. Ο πάροχος φιλοξενίας κρατά για λίγο τεχνικά αρχεία (όπως διευθύνσεις IP) για την ασφάλεια του ιστοτόπου."],
    ["Κρατήσεις", "Όταν κάνετε κράτηση, μεταφέρεστε στο σύστημα κρατήσεών μας της WebHotelier (zoeshotelfaliraki.reserve-online.net). Τα στοιχεία που καταχωρείτε εκεί (όνομα, στοιχεία επικοινωνίας, πληρωμή) χρησιμοποιούνται για την κράτηση και τη διαχείρισή της, σύμφωνα με τους όρους απορρήτου της WebHotelier και τους δικούς μας. Οι πληρωμές με κάρτα γίνονται από τον πάροχο πληρωμών και δεν αποθηκεύονται από εμάς."],
    ["Τηλέφωνο και email", "Αν μας τηλεφωνήσετε ή μας γράψετε, χρησιμοποιούμε τα στοιχεία σας μόνο για να σας απαντήσουμε και να οργανώσουμε τη διαμονή σας, και τα κρατάμε όσο χρειάζεται γι' αυτό και για τις νομικές και φορολογικές μας υποχρεώσεις."],
    ["Γραμματοσειρές, χάρτες και σύνδεσμοι", "Οι γραμματοσειρές φορτώνονται από τον ίδιο τον ιστότοπο. Ο σύνδεσμος «Οδηγίες πρόσβασης» ανοίγει το OpenStreetMap σε νέα σελίδα· οι σύνδεσμοι προς άλλους ιστοτόπους υπόκεινται στους δικούς τους όρους απορρήτου."],
    ["Cookies", "Δεν χρησιμοποιούμε cookies σε αυτόν τον ιστότοπο. Ο φυλλομετρητής σας μπορεί να αποθηκεύει μικρά τεχνικά αρχεία για τη λειτουργία του, τα οποία δεν χρησιμοποιούνται για παρακολούθηση."],
    ["Τα δικαιώματά σας", "Μπορείτε να ζητήσετε πρόσβαση, διόρθωση ή διαγραφή των δεδομένων σας, ή να αντιταχθείτε στη χρήση τους, στέλνοντας email στο info@zoes.gr. Μπορείτε επίσης να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (dpa.gr)."],
  ],
};

export const privacy = (l: Locale) => (l === "el" ? el : en);
