import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { formattedAddress, site } from "@/lib/site";

/**
 * Google Maps embed for the office. Deliberately unfiltered — a map is a
 * functional element, and tinting it to match the palette costs legibility.
 * The frame does the styling work instead.
 *
 * `loading="lazy"` keeps the third-party frame off the critical path; it sits
 * well below the fold on /contact.
 */
export function OfficeMap() {
  return (
    <Section tone="alt" id="find-us">
      <Container>
        <SectionHeading
          eyebrow="Find us"
          title="One office in Tumkur"
          intro="All five verticals operate from the same address. Chirantana Swadeshi Bhandara is the storefront — look for it on the map."
        />

        <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-panel hairline">
          <iframe
            title={`Map showing ${site.name} at ${formattedAddress}`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7764.868913814071!2d77.11410441922722!3d13.323228987981759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb02d52692c261d%3A0x80608dcb87435cb4!2sChirantana%20Swadeshi%20Bhandara!5e0!3m2!1sen!2sin!4v1789236631062!5m2!1sen!2sin"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="block h-[20rem] w-full border-0 md:h-[26rem] lg:h-[30rem]"
          />
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-lg leading-relaxed text-obsidian-700">
            {formattedAddress}
          </p>
          <ButtonLink href={site.mapsUrl} external size="lg" variant="outline">
            Get directions
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
