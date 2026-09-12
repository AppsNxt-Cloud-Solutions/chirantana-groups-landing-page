import type { Vertical } from "@/content/verticals";
import { verticalContact, verticals } from "@/content/verticals";
import { site } from "@/lib/site";

/** Structured data. `<` is escaped so the JSON cannot break out of the script. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required to emit ld+json; value is serialised JSON with < escaped
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const ORGANISATION_ID = `${site.url}/#organisation`;
const verticalId = (slug: string) => `${site.url}/verticals/${slug}#organisation`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.line1,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

/** Emitted once, from the root layout. */
export function OrganisationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORGANISATION_ID,
        name: site.legalName,
        url: site.url,
        email: site.email,
        telephone: site.phone.e164,
        slogan: site.tagline,
        description: site.description,
        logo: `${site.url}/icon.png`,
        address: postalAddress,
        hasMap: site.mapsUrl,
        subOrganization: verticals.map((v) => ({
          "@type": v.schemaType,
          "@id": verticalId(v.slug),
          name: v.name,
          url: `${site.url}/verticals/${v.slug}`,
        })),
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: site.url,
        name: site.name,
        publisher: { "@id": ORGANISATION_ID },
      }}
    />
  );
}

export function VerticalJsonLd({ vertical }: { vertical: Vertical }) {
  const contact = verticalContact(vertical);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": vertical.schemaType,
        "@id": verticalId(vertical.slug),
        name: vertical.name,
        description: vertical.summary,
        url: `${site.url}/verticals/${vertical.slug}`,
        ...(vertical.externalUrl ? { sameAs: vertical.externalUrl } : {}),
        parentOrganization: { "@id": ORGANISATION_ID },
        address: postalAddress,
        telephone: contact.phone.e164,
        email: contact.email,
      }}
    />
  );
}

export function BreadcrumbJsonLd({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${site.url}${crumb.path}`,
        })),
      }}
    />
  );
}
