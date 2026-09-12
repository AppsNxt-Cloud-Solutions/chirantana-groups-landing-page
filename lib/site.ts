/**
 * Single source of truth for company facts used across metadata, JSON-LD,
 * the footer and every contact surface.
 */

export const site = {
  name: "Chirantana Group",
  legalName: "Chirantana Group",
  tagline: "Creating value. Building trust. Connecting people.",
  description:
    "Chirantana Group is a diversified group of five businesses — Chirantana Foundation, Chirantana Naturals, Chirantana Swadeshi Bhandara, SV Lots India Pvt. Ltd. and Karoli Konnect — built on a shared foundation of trust, quality, service and long-term value creation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chirantanagroups.com",

  email: "info@chirantanagroups.com",

  /** Shared with SV Lots — same number for calls and WhatsApp. */
  phone: {
    display: "+91 72045 13996",
    /** E.164, for tel: and wa.me links */
    e164: "+917204513996",
  },
  whatsapp: "917204513996",

  address: {
    line1: '"Omkara", 5th Cross, SIT Extension',
    city: "Tumkur",
    region: "Karnataka",
    postalCode: "572102",
    country: "IN",
  },

  /** CID of the Chirantana Swadeshi Bhandara storefront — the group's address. */
  mapsUrl: "https://maps.google.com/?cid=9250549539906215092",

  founded: "Tumkur, Karnataka",

  developer: {
    name: "AppsNxt Cloud Solutions",
  },
} as const;

export const telHref = `tel:${site.phone.e164}`;
export const whatsappHref = `https://wa.me/${site.whatsapp}`;

/** `number` is digits only, no '+'. */
export function whatsappLink(number: string, message?: string) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const formattedAddress = [
  site.address.line1,
  `${site.address.city} – ${site.address.postalCode}`,
  site.address.region,
].join(", ");

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Group", href: "/#story" },
  { label: "Verticals", href: "/verticals" },
  { label: "Vision", href: "/#vision" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  group: [
    { label: "About the Group", href: "/#story" },
    { label: "Our Verticals", href: "/verticals" },
    { label: "Vision & Mission", href: "/#vision" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
  ],
};
