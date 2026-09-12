import type { DrawIconName } from "@/components/motion/draw-icon";
import { site } from "@/lib/site";

/**
 * The five verticals. One typed module drives the homepage showcase, the
 * /verticals index, every /verticals/[slug] page, the OG cards and the
 * structured data.
 *
 * All copy is taken from the group's own brief — the `sector` and
 * `coreBusiness` lines come from its five-category table, and every string in
 * `offerings[].items` is a listed activity, product area or service. Nothing
 * here is invented.
 */

export type VerticalSlug =
  | "chirantana-foundation"
  | "chirantana-naturals"
  | "chirantana-swadeshi-bhandara"
  | "sv-lots"
  | "karoli-konnect";

/** Maps 1:1 to the [data-accent] scopes in app/globals.css. */
export type AccentKey = "ember" | "moss" | "saffron" | "slate" | "indigo";

export type VerticalOffering = {
  title: string;
  description: string;
  icon: DrawIconName;
  /** The specific activities, products or services under this heading. */
  items: string[];
};

/**
 * Per-vertical contact details. Anything omitted falls back to the group's
 * own number and inbox in lib/site.ts — only verticals that run their own
 * line need an entry here.
 */
export type VerticalContact = {
  phone?: { display: string; e164: string };
  /** Digits only, no '+'. May differ from the phone number. */
  whatsapp?: string;
  email?: string;
};

export type Vertical = {
  slug: VerticalSlug;
  /** Full brand name — "SV Lots India Pvt. Ltd." */
  name: string;
  /** Rail / nav form — "SV Lots" */
  shortName: string;
  /** Main category from the group's five-category table — "Real Estate". */
  sector: string;
  /** Core business line from the same table. Used as the card subtitle. */
  coreBusiness: string;
  /** One editorial line, ≤ 70 chars. Hero + showcase panel. */
  tagline: string;
  /** One or two sentences. Panel body + meta description. */
  summary: string;
  /** Paragraphs for the vertical page. */
  story: string[];
  /** Drives [data-accent], the shader tint and the OG card colour. */
  accent: AccentKey;
  icon: DrawIconName;
  /** Heading for the offerings section on the vertical page. */
  offeringsTitle: string;
  offerings: VerticalOffering[];
  /** Renders a "Visit website" CTA when present. */
  externalUrl?: string;
  /** Renders a "Website coming soon" note when no externalUrl exists yet. */
  websiteComingSoon?: boolean;
  /** Pre-filled WhatsApp text for this vertical's enquiry CTA. */
  whatsappMessage: string;
  /** Only present when this vertical runs its own line. */
  contact?: VerticalContact;
  schemaType: "NGO" | "Organization" | "Store" | "RealEstateAgent" | "TravelAgency";
  seo: { title: string; description: string };
};

export const verticals: Vertical[] = [
  {
    slug: "chirantana-foundation",
    name: "Chirantana Foundation",
    shortName: "Foundation",
    sector: "Social & Community",
    coreBusiness: "Wellness, social welfare & community initiatives",
    tagline: "A healthier, more connected society",
    summary:
      "Chirantana Foundation is the social and community-focused initiative of Chirantana Group, working towards wellness, awareness, education, community development and meaningful social initiatives.",
    story: [
      "Chirantana Foundation is the social and community-focused initiative of Chirantana Group, working towards wellness, awareness, education, community development and meaningful social initiatives.",
      "Its work runs from health and wellness awareness programmes, camps and workshops through to educational initiatives, environmental awareness and cultural activities — with volunteer and community participation at the centre of how it operates.",
    ],
    accent: "ember",
    icon: "community",
    offeringsTitle: "Where the Foundation works",
    offerings: [
      {
        title: "Health & wellness",
        description: "Awareness, camps and workshops around healthier everyday living.",
        icon: "heart",
        items: [
          "Health & wellness awareness programs",
          "Wellness camps and workshops",
          "Natural and healthy living awareness",
        ],
      },
      {
        title: "Community & family",
        description: "Bringing people together around shared purpose and participation.",
        icon: "users",
        items: [
          "Community development activities",
          "Family and community activities",
          "Volunteer and community participation programs",
        ],
      },
      {
        title: "Education & culture",
        description: "Learning and cultural work that carries tradition forward.",
        icon: "book",
        items: ["Educational initiatives", "Cultural and social initiatives"],
      },
      {
        title: "Welfare & environment",
        description: "Direct support, and awareness of the environment we share.",
        icon: "recycle",
        items: ["Social welfare programs", "Environmental awareness"],
      },
    ],
    websiteComingSoon: true,
    whatsappMessage: "Hello, I'd like to know more about Chirantana Foundation.",
    schemaType: "NGO",
    seo: {
      title: "Chirantana Foundation — social welfare, wellness and community development",
      description:
        "The social initiative of Chirantana Group: health and wellness awareness, community development, educational initiatives, environmental awareness and cultural programmes.",
    },
  },
  {
    slug: "chirantana-naturals",
    name: "Chirantana Naturals",
    shortName: "Naturals",
    sector: "Natural Products",
    coreBusiness: "Manufacturing, wellness & wholesale",
    tagline: "Natural products, responsibly made",
    summary:
      "Chirantana Naturals focuses on natural, traditional and wellness-oriented products, with an emphasis on quality, responsible sourcing and healthy living.",
    story: [
      "Chirantana Naturals focuses on natural, traditional and wellness-oriented products, with an emphasis on quality, responsible sourcing and healthy living.",
      "The range spans cold-pressed oils, herbal and Ayurvedic products, organic foods, millets and traditional grains, spices, natural sweeteners and personal care. Alongside it sits a trade business — wholesale and retail supply, bulk and institutional orders, sourcing, and private-label opportunities where applicable.",
    ],
    accent: "moss",
    icon: "leaf",
    offeringsTitle: "Products and trade",
    offerings: [
      {
        title: "Foods & staples",
        description: "Everyday kitchen staples, sourced and made with care.",
        icon: "grain",
        items: [
          "Organic food products",
          "Millets & traditional grains",
          "Spices & pulses",
          "Natural sweeteners",
          "Natural snacks",
        ],
      },
      {
        title: "Oils & drinks",
        description: "Cold-pressed oils and natural beverages.",
        icon: "bottle",
        items: ["Cold-pressed oils", "Natural juices & drinks"],
      },
      {
        title: "Wellness & care",
        description: "Herbal, Ayurvedic and traditional preparations for body and home.",
        icon: "mortar",
        items: [
          "Herbal products",
          "Ayurvedic & wellness products",
          "Natural personal-care products",
          "Traditional Indian wellness products",
          "Cow-based natural products",
        ],
      },
      {
        title: "Trade & supply",
        description:
          "Manufacturing capacity behind a full wholesale and institutional offer.",
        icon: "boxes",
        items: [
          "Wholesale supply",
          "Retail supply",
          "Bulk orders",
          "Institutional supply",
          "Organic retailer support",
          "Wellness coach support",
          "Product sourcing",
          "Private-label opportunities",
        ],
      },
    ],
    externalUrl: "http://chirantananatural.com/",
    whatsappMessage:
      "Hello, I'd like to know more about Chirantana Naturals products and wholesale.",
    schemaType: "Organization",
    seo: {
      title: "Chirantana Naturals — natural products, manufacturing and wholesale",
      description:
        "Cold-pressed oils, herbal and Ayurvedic products, organic foods, millets, spices and natural personal care — with wholesale, bulk, institutional and private-label supply.",
    },
  },
  {
    slug: "chirantana-swadeshi-bhandara",
    name: "Chirantana Swadeshi Bhandara",
    shortName: "Swadeshi Bhandara",
    sector: "Retail & E-Commerce",
    coreBusiness: "Organic, natural, traditional & eco products",
    tagline: "One destination for conscious living",
    summary:
      "Chirantana Swadeshi Bhandara is a one-stop destination for natural, organic, traditional, wellness and eco-friendly products for everyday living, with both physical stores and online shopping.",
    story: [
      "Chirantana Swadeshi Bhandara is a one-stop destination for natural, organic, traditional, wellness and eco-friendly products for everyday living, with both physical stores and online shopping.",
      "The range is organised the way a household actually shops — Eat Natural, Health & Wellness, Care & Glow, Pray & Celebrate, Go Green and Our Traditions — supported by local and courier delivery, wholesale supply, and guidance on what a product is for and how to use it.",
    ],
    accent: "saffron",
    icon: "store",
    offeringsTitle: "What's in store",
    offerings: [
      {
        title: "Eat Natural",
        description: "The everyday pantry, from grains and dals to oils and snacks.",
        icon: "basket",
        items: [
          "Organic groceries",
          "Rice",
          "Millets",
          "Pulses",
          "Dals",
          "Flours",
          "Spices",
          "Jaggery",
          "Natural salts",
          "Cold-pressed oils",
          "Natural snacks",
          "Herbal drinks",
        ],
      },
      {
        title: "Health & Wellness",
        description: "Ayurvedic, herbal and natural health support.",
        icon: "mortar",
        items: [
          "Ayurvedic products",
          "Herbal products",
          "Wellness supplements",
          "Acupressure products",
          "Natural health-support products",
        ],
      },
      {
        title: "Care & Glow",
        description: "Personal care and beauty, made from natural ingredients.",
        icon: "sparkle",
        items: [
          "Natural personal care",
          "Ayurvedic cosmetics",
          "Hair care",
          "Skin care",
          "Natural beauty products",
        ],
      },
      {
        title: "Pray & Celebrate",
        description: "Pooja, festival and spiritual essentials, plus gifting.",
        icon: "gift",
        items: [
          "Pooja essentials",
          "Spiritual products",
          "Festival items",
          "Traditional pooja sets",
          "Gifting items",
        ],
      },
      {
        title: "Go Green",
        description: "Eco-friendly household goods and traditional cookware.",
        icon: "recycle",
        items: [
          "Eco-friendly products",
          "Natural household products",
          "Sustainable living products",
          "Traditional cookware",
          "Clay / cast iron / bronze products",
        ],
      },
      {
        title: "Our Traditions",
        description: "Craft, toys and décor that carry Indian cultural traditions.",
        icon: "home",
        items: [
          "Traditional products",
          "Channapatna toys",
          "Gollu / Pattada Bombe",
          "Indian cultural products",
          "Traditional gifts",
          "Home décor",
        ],
      },
      {
        title: "Shopping & support",
        description: "Buy in store or online, with delivery and real product guidance.",
        icon: "store",
        items: [
          "Online shopping",
          "Store shopping",
          "Local delivery",
          "Courier delivery",
          "Wholesale support",
          "Product guidance",
          "Nutritional & usage education",
        ],
      },
    ],
    externalUrl: "http://chirantananatural.com/",
    whatsappMessage: "Hello, I'd like to know more about Chirantana Swadeshi Bhandara.",
    schemaType: "Store",
    seo: {
      title: "Chirantana Swadeshi Bhandara — organic, natural and eco-friendly store",
      description:
        "A one-stop destination for organic groceries, Ayurvedic and herbal wellness, natural personal care, pooja essentials, eco-friendly goods and traditional crafts — in store and online.",
    },
  },
  {
    slug: "sv-lots",
    name: "SV Lots India Pvt. Ltd.",
    shortName: "SV Lots",
    sector: "Real Estate",
    coreBusiness: "Property, surveying, GIS & consultancy",
    tagline: "Property solutions, professionally delivered",
    summary:
      "SV Lots India Pvt. Ltd. provides professional real estate and property-related solutions, combining property consultancy, surveying, mapping and technology-driven services.",
    story: [
      "SV Lots India Pvt. Ltd. provides professional real estate and property-related solutions, combining property consultancy, surveying, mapping and technology-driven services.",
      "It works across residential, commercial and agricultural property — buying, selling, marketing and consultancy — backed by DGPS and Total Station survey capability, GIS and digital mapping, and the documentation, evaluation and site-visit support that a property decision depends on.",
    ],
    accent: "slate",
    icon: "land",
    offeringsTitle: "Services",
    offerings: [
      {
        title: "Real estate",
        description:
          "Residential, commercial and agricultural property, bought and sold.",
        icon: "briefcase",
        items: [
          "Residential properties",
          "Residential plots",
          "Commercial properties",
          "Agricultural land",
          "Property buying",
          "Property selling",
          "Property marketing",
          "Property consultancy",
          "Investment opportunities",
          "Project marketing",
        ],
      },
      {
        title: "Surveying",
        description: "DGPS and Total Station work, from boundaries to infrastructure.",
        icon: "survey",
        items: [
          "DGPS survey",
          "Total Station survey",
          "Land survey",
          "Boundary survey",
          "Topographical survey",
          "Site measurement",
          "Layout survey",
          "Road & infrastructure survey",
        ],
      },
      {
        title: "Technology & GIS",
        description: "Spatial data and digital mapping behind every property decision.",
        icon: "map",
        items: [
          "GIS mapping",
          "Digital property mapping",
          "KML/KMZ mapping",
          "Property information systems",
          "Spatial data management",
          "Location-based property information",
        ],
      },
      {
        title: "Property support",
        description: "Evaluation, documentation and coordination through to site visits.",
        icon: "document",
        items: [
          "Property evaluation",
          "Documentation support",
          "Due diligence coordination",
          "Loan assistance coordination",
          "Property verification support",
          "Site visits",
          "Project consultancy",
        ],
      },
    ],
    externalUrl: "https://www.svlots.com/",
    whatsappMessage: "Hello, I'd like to enquire about SV Lots property services.",
    schemaType: "RealEstateAgent",
    seo: {
      title:
        "SV Lots India Pvt. Ltd. — real estate, surveying, GIS and property consultancy",
      description:
        "Residential, commercial and agricultural property with DGPS and Total Station surveying, GIS and digital mapping, evaluation, documentation and site-visit support.",
    },
  },
  {
    slug: "karoli-konnect",
    name: "Karoli Konnect",
    shortName: "Karoli Konnect",
    sector: "Travel & Tourism",
    coreBusiness: "Domestic, international & customized tours",
    tagline: "Connecting people with destinations",
    summary:
      "Karoli Konnect provides domestic and international travel solutions, helping individuals, families, groups and organisations plan comfortable and memorable journeys.",
    story: [
      "Karoli Konnect provides domestic and international travel solutions, helping individuals, families, groups and organisations plan comfortable and memorable journeys.",
      "Journeys range across Karnataka, Kerala, Tamil Nadu, Goa, Rajasthan, North and Northeast India and pilgrimage destinations, as well as Asia, the Middle East and Europe — as packages, customised itineraries or group travel, with hotels, transport and sightseeing arranged end to end.",
    ],
    accent: "indigo",
    icon: "compass",
    offeringsTitle: "Where we go, and how",
    offerings: [
      {
        title: "Domestic tours",
        description: "Across India's regions, and its pilgrimage routes.",
        icon: "map",
        items: [
          "Karnataka",
          "Kerala",
          "Tamil Nadu",
          "Goa",
          "North India",
          "Northeast India",
          "Rajasthan",
          "Pilgrimage destinations",
        ],
      },
      {
        title: "International tours",
        description: "Destinations abroad, planned end to end.",
        icon: "plane",
        items: ["Asia", "Middle East", "Europe", "Other international destinations"],
      },
      {
        title: "Special tours",
        description: "Built around who is travelling and why.",
        icon: "route",
        items: [
          "Family tours",
          "Group tours",
          "Corporate tours",
          "Educational tours",
          "Pilgrimage tours",
          "Honeymoon tours",
          "Customized tours",
          "Weekend getaways",
        ],
      },
      {
        title: "Travel support",
        description:
          "The logistics handled, so the journey is the only thing to think about.",
        icon: "bed",
        items: [
          "Tour packages",
          "Customized itineraries",
          "Hotel bookings",
          "Transportation",
          "Sightseeing",
          "Group travel planning",
          "Destination assistance",
          "Travel consultation",
        ],
      },
    ],
    externalUrl: "https://www.karolikonnect.co.in/",
    whatsappMessage: "Hello, I'd like to plan a trip with Karoli Konnect.",
    contact: {
      phone: { display: "080 4877 5405", e164: "+918048775405" },
      whatsapp: "919964299799",
      email: "care@karolikonnect.com",
    },
    schemaType: "TravelAgency",
    seo: {
      title: "Karoli Konnect — domestic and international tours, customized travel",
      description:
        "Domestic tours across Karnataka, Kerala, Goa, Rajasthan and North India, international travel to Asia, the Middle East and Europe, plus group, corporate and customized tours.",
    },
  },
];

export const verticalSlugs = verticals.map((v) => v.slug);

/**
 * A vertical's contact details, with the group's as the fallback. `ownContact`
 * says whether this vertical runs its own line — surfaces that would otherwise
 * repeat the group's details use it to stay quiet.
 */
export function verticalContact(vertical: Vertical) {
  return {
    phone: vertical.contact?.phone ?? site.phone,
    whatsapp: vertical.contact?.whatsapp ?? site.whatsapp,
    email: vertical.contact?.email ?? site.email,
    ownContact: Boolean(vertical.contact),
  };
}

export function getVertical(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug);
}

export function otherVerticals(slug: string): Vertical[] {
  return verticals.filter((v) => v.slug !== slug);
}

/**
 * The ONLY place accent hexes exist outside app/globals.css. Feeds the OG
 * images (which cannot read CSS) and the shader (which must not read CSS).
 * Keep in sync with the @theme block.
 */
export const accentHex: Record<AccentKey | "brass", Record<300 | 500 | 700, string>> = {
  brass: { 300: "#dcc59c", 500: "#b08d55", 700: "#6b4f2a" },
  ember: { 300: "#e7b8a9", 500: "#ae7462", 700: "#6c4235" },
  moss: { 300: "#a9cfb2", 500: "#60926d", 700: "#33583d" },
  saffron: { 300: "#d1c49a", 500: "#95834c", 700: "#5b4d24" },
  slate: { 300: "#99cedc", 500: "#4691a2", 700: "#1d5764" },
  indigo: { 300: "#c4bee7", 500: "#857cb0", 700: "#4f486e" },
};

/** Hex → [r, g, b] in 0–1 for shader uniforms. */
export function hexToRgb01(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => Number.parseInt(h.slice(i, i + 2), 16) / 255) as [
    number,
    number,
    number,
  ];
}
