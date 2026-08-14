// site.config.tsx -- PER-SITE CONTENT.  This + pages + tokens.css are all you edit.
// Café Josee instance (Borgerhout, Antwerpen). Prospect DEMO concept, intake Scenario 2.
// No secret lives here; integration endpoints are public routes to edge functions that
// hold their keys in env (S6).
import type { NavItem, FooterColumn, Social } from "../components/spine/chrome";

export const site = {
  name: "Café Josee",

  // DEMO destination (build-agent S3 / intake S9): the shared catch-all, NEVER the
  // prospect's own address. The cafe's public address (josee.cafe@gmail.com, read from
  // their Facebook page) is recorded in the charter as the one go-live CONTACT_TENANTS
  // swap, and is deliberately not wired here.
  contactEmail: "contact@aismith.io",

  integrations: {
    // Shared AISmith-functions hardened `contact` fn. Destination resolves server-side
    // from the origin map; nothing about the recipient travels in the request body.
    contactAction: "https://jctzzxibnflyvfallpva.supabase.co/functions/v1/contact",
    newsletterAction: "",  // newsletter OFF by default (intake S6)
    booking: "",           // no booking surface: the cafe takes no reservations
  },

  // S5: data posture -- declared in cafe-josee-site-charter.md as "no-db, static-in-repo",
  // connecting the shared AISmith-functions backbone. Nothing is stored.

  // verify.mjs [6] LOGO -- brand mark KIND. Café Josee has a REAL mark (two teal cups over
  // a green dome), extracted from the mark published on their own Facebook profile and
  // keyed off its printed card ground. So this is a genuine image mark, not a wordmark.
  brandMark: { kind: "image", src: "/cafe-josee-mark.png" },
};

// Demo = true (public but not crawlable; shareable for feedback). Production = false.
export const seo = { noindex: true };

export const nav: NavItem[] = [
  { label: "Koffie en keuken", href: "/" },
  { label: "Drankkaart", href: "/drankkaart" },
  { label: "Apero", href: "/apero" },
  { label: "Het café", href: "/het-cafe" },
  { label: "Praktisch", href: "/praktisch" },
];

export const footerColumns: FooterColumn[] = [
  { title: "Bij Josee", links: [
    { label: "Drankkaart", href: "/drankkaart" },
    { label: "Apero op vrijdag en zaterdag", href: "/apero" },
  ]},
  { title: "Het café", links: [
    { label: "De zaak en de buurt", href: "/het-cafe" },
    { label: "Openingsuren en adres", href: "/praktisch" },
  ]},
  { title: "Contact", links: [
    { label: "0468 46 19 16", href: "tel:+32468461916" },
    { label: "Vosstraat 2, 2140 Borgerhout", href: "/praktisch" },
  ]},
];

const ig = (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.2" cy="6.8" r="1.25" fill="currentColor" />
  </svg>
);
const fb = (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.63A22 22 0 0 0 14.3 3.5c-2.4 0-4 1.46-4 4.15V9.9H7.6V13h2.7v8z" />
  </svg>
);
export const socials: Social[] = [
  { label: "Instagram", href: "https://www.instagram.com/cafe_josee/", icon: ig },
  { label: "Facebook", href: "https://www.facebook.com/cafejosee.antwerp/", icon: fb },
];

// S8.3 / footer rule. The concept marker (intake S6) lives here.
export const legal = "Café Josee, Vosstraat 2, 2140 Borgerhout. Conceptsite door AI Smith, 2026.";

// S7.4: privacy-notice data. Reflects this site's ACTUAL subprocessors, never boilerplate.
// Netlify hosts; the contact form posts to the shared AISmith-functions `contact` fn which
// sends through Resend; the Praktisch page carries a Map facade that loads Google only on
// a click.
export const privacy = {
  controller: { name: "Café Josee", email: "contact@aismith.io" },
  subprocessors: [
    { name: "Netlify", purpose: "hosting en serverlogs", location: "EU/VS", link: "https://www.netlify.com/privacy/" },
    { name: "Resend", purpose: "verzenden van het contactformulier", location: "EU/VS", link: "https://resend.com/legal/privacy-policy" },
    { name: "Google Maps", purpose: "kaartweergave, laadt pas na een klik", location: "EU/VS", link: "https://policies.google.com/privacy" },
  ],
  effectiveDate: "14 augustus 2026",
  mapsEmbed: true,
  lang: "nl" as const,
};

// Photography (intake S6: referenced, not claimed). Café Josee has no website, so there
// is no site of their own to reuse image URLs from. These are the photos published on
// their OWN Google Business Profile, referenced by their live Google-hosted URLs. Every
// one is the cafe's own room, own food, own coffee. No stock, no grey boxes.
const gbp = (id: string, w: number, h: number) =>
  `https://lh3.googleusercontent.com/gps-cs-s/${id}=w${w}-h${h}-k-no`;

export const photos = {
  interior: gbp("AHRPTWll6ymrWfvipTzNx_RSZdR1RkER9NhuVNHdeC8jW1Kot-iykkWqOYf8k0AYa-df4W3SFSxxzfd9keTACOg2Z9lv83f-IPT1j0R1j3JkW14IvmEjiSPx5HGwyjOSZc-2pYvfMa_Y8ATus3Tn", 1200, 800),
  counter: gbp("AHRPTWnY3Q44Pi1tYMg52qKZ1FVMwwfW3C-fd8FyOJ_pNhCS887a4NrUoAyd6ukWt3jgI5Fm7OkKu0s6l5Du01uu55BkpmpqPpzX2YLthhAxu8yHIJLxUTGDgctSPorJaiWawNM0xbYC", 1200, 800),
  lattes: gbp("AHRPTWmv-WJ43YjTXIo6DjmDLVqAfyfeiU4CBqk9APv_rnAYqvD5Z0taoi9KA4yIMG29SZzOWKXNpcsWuEnagsE_ZE6Kapsy02lqal30s7ZdnvRJF9o8QadER1WY_JfMmFZXYr8Q4W14Rtlqwf6c", 900, 700),
  brunch: gbp("AHRPTWn2oqJDQH99A0O9Kc5mQJvDA1MLZq7w8W-qZiiOjnMqa-fENyfGUNfDVfYWfXWncR9Iaf3XorpA0DdDKQKvrVP2zAJTaHCjlkzD4rwHSZ4YADf9NtNJHFKbZsyof-0d3WKaHDPX5NIS9VeV", 900, 700),
  lunch: gbp("AHRPTWl35S40Hu7Okz1Wtt2_YELUH9ipBW2yVEXphLeXVJCxxIIj0KUqWkPqdjmkQLc0ZLYqaHS67RwJlVJNSl8NUQsjSMwGGjaRIUUNzMVSNl4t63XgUXukzV35OA527ZZN5dzSWV7AQI0ZKqct", 900, 700),
  koekjes: gbp("AHRPTWn6NRTGsNnsjPcSfNJ8SCgpgAozSG8A3QoUvU4krH9DuV9aJ6D6zgiS7N5FnLxnZQ9rkzsNG-yyBw_YXe58vCJfyiaYKk1vHnjQiOTlaeVXpMmaGUCfm-XIGPEm-rklljOrxl9yxQ", 900, 700),
  kaart: gbp("AHRPTWlPJsI6PjHORh0F0bHeY16TyA-vFYgahiX0hSyho8md9CpPpZtf2YElp0oROU4XPlntvlvtMFM1wVF727i6wmgNVi4nJz5miIlrNoqbH93_O7_v-l_bvBFqW3u-CkQ7VWfEupNpMA", 900, 1270),
};

// FACTS (intake S5). GBP is authoritative on name, address, phone, hours and category.
// Read from the rendered Maps panel on 14 August 2026 and cross-checked against the
// cafe's own Instagram bio, which agrees line for line.
export const facts = {
  address: "Vosstraat 2, 2140 Borgerhout (Antwerpen)",
  phone: "0468 46 19 16",
  phoneHref: "tel:+32468461916",
  mapsQuery: "Café Josee, Vosstraat 2, 2140 Antwerpen",
  hours: [
    { label: "Maandag", value: "08.45 tot 16.30" },
    { label: "Dinsdag", value: "08.45 tot 16.30" },
    { label: "Woensdag", value: "08.45 tot 16.30" },
    { label: "Donderdag", value: "Gesloten" },
    { label: "Vrijdag", value: "08.45 tot 16.30" },
    { label: "Zaterdag", value: "10.00 tot 16.30" },
    { label: "Zondag", value: "10.00 tot 16.30" },
    { label: "Apero, vrijdag", value: "17.00 tot 23.00" },
    { label: "Apero, zaterdag", value: "17.00 tot 23.00" },
  ],
};
