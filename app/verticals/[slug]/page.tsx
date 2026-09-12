import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CtaBand } from "@/components/sections/cta-band";
import { BreadcrumbJsonLd, VerticalJsonLd } from "@/components/seo/json-ld";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { VerticalOfferings } from "@/components/verticals/vertical-offerings";
import { VerticalCrossLinks } from "@/components/verticals/vertical-cross-links";
import { VerticalHero } from "@/components/verticals/vertical-hero";
import { getVertical, verticalContact, verticalSlugs } from "@/content/verticals";
import { formattedAddress, site } from "@/lib/site";

/** Prerender all five; 404 anything else so the route stays fully static. */
export function generateStaticParams() {
  return verticalSlugs.map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/verticals/[slug]">): Promise<Metadata> {
  const { slug } = await params; // Next 16: params is a Promise
  const vertical = getVertical(slug);
  if (!vertical) return {};
  return {
    title: vertical.seo.title,
    description: vertical.seo.description,
    alternates: { canonical: `/verticals/${slug}` },
    openGraph: {
      type: "website",
      title: vertical.seo.title,
      description: vertical.seo.description,
      url: `/verticals/${slug}`,
    },
  };
}

export default async function VerticalPage({ params }: PageProps<"/verticals/[slug]">) {
  const { slug } = await params;
  const vertical = getVertical(slug);
  if (!vertical) notFound();
  const contact = verticalContact(vertical);

  return (
    // Every accent-* utility below this node resolves to this vertical's hue.
    <div data-accent={vertical.accent}>
      <VerticalHero vertical={vertical} />

      <Section tone="light" size="lg">
        <Container className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="About" title={vertical.tagline} />
            <Stagger gap={0.15} className="mt-10 space-y-6">
              {vertical.story.map((paragraph) => (
                <StaggerItem key={paragraph.slice(0, 24)}>
                  <p className="text-lg leading-relaxed text-obsidian-600">{paragraph}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.2} className="lg:sticky lg:top-28 lg:self-start">
            <Card className="p-7 md:p-8">
              <p className="text-xs font-medium tracking-widest text-accent-700 uppercase">
                At a glance
              </p>
              <dl className="mt-6 space-y-5 text-sm">
                <Row label="Sector" value={vertical.sector} />
                <Row label="Focus" value={vertical.coreBusiness} />
                <Row label="Part of" value={site.name} />
                <Row label="Office" value={formattedAddress} />
                {contact.ownContact && (
                  <>
                    <Row
                      label="Phone"
                      value={
                        <a
                          href={`tel:${contact.phone.e164}`}
                          className="text-accent-700 underline decoration-accent-300 underline-offset-2"
                        >
                          {contact.phone.display}
                        </a>
                      }
                    />
                    <Row
                      label="Email"
                      value={
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-accent-700 underline decoration-accent-300 underline-offset-2"
                        >
                          {contact.email}
                        </a>
                      }
                    />
                  </>
                )}
                {!vertical.externalUrl && vertical.websiteComingSoon && (
                  <Row label="Website" value="Coming soon" />
                )}
                {vertical.externalUrl && (
                  <Row
                    label="Website"
                    value={
                      <a
                        href={vertical.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-700 underline decoration-accent-300 underline-offset-2"
                      >
                        {prettyUrl(vertical.externalUrl)}
                      </a>
                    }
                  />
                )}
              </dl>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <SectionHeading eyebrow="What we do" title={vertical.offeringsTitle} />
          <div className="mt-12">
            <VerticalOfferings offerings={vertical.offerings} />
          </div>
        </Container>
      </Section>

      <VerticalCrossLinks slug={vertical.slug} />
      <CtaBand vertical={vertical} />

      <VerticalJsonLd vertical={vertical} />
      <BreadcrumbJsonLd
        trail={[
          { name: site.name, path: "/" },
          { name: "Verticals", path: "/verticals" },
          { name: vertical.shortName, path: `/verticals/${vertical.slug}` },
        ]}
      />
    </div>
  );
}

/** "https://www.svlots.com/" -> "svlots.com" */
function prettyUrl(url: string) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-4 border-t border-obsidian-200 pt-4 first:border-t-0 first:pt-0">
      <dt className="text-obsidian-500">{label}</dt>
      <dd className="text-obsidian-800">{value}</dd>
    </div>
  );
}
